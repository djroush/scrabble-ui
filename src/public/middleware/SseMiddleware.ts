import {Store} from 'redux'

import { SseGameCompleteEvent, SseGameHeartbeatEvent, SseGameInfo, SseGameUpdateEvent } from "actions/SseActions";

import { AppAction, Type } from '../actions'; 
import * as SseActionNames from '../actions/SseActionNames';
import * as AsyncActionCreator from '../actions/AsyncActionCreator';
import {AppState} from '../types/State';
import { GameResponseSuccess, } from 'types/Service';

const SseMiddleware: any = (store: Store<AppState, AppAction>) => (next: (action: AppAction) => void) => (action: AppAction)  => {
   let source: EventSource = null;
   const sseEndpoint = 'http://localhost:8080/v1/scrabble/sse';

   const attachGame = (sseGameInfo: SseGameInfo): void => {
      const {gameId, playerId} = sseGameInfo;
      source = new EventSource(sseEndpoint + '/' + gameId + '/' + playerId);

      console.log("Attaching to source: " + source.url)

      source.addEventListener<any>("game-update", function(event: SseGameUpdateEvent) {
        const data: GameResponseSuccess = JSON.parse(event.data)
        const state = data?.game?.state
         if (state === "ABORTED" || state === "FINISHED" || state === "ABANDONED") {
            sessionStorage.removeItem('gameState');
         } else {
            sessionStorage.setItem('gameState', event.data);
         }

        const eTag: string = event.id
        console.log("received game update: " + eTag)
        updateGame(data, eTag) 
      });
      source.addEventListener<any>("game-heartbeat", function(event: SseGameHeartbeatEvent) {
         console.log(event)
      });
      source.addEventListener<any>("game-complete", function(event: SseGameCompleteEvent) {
         console.log("Detaching from source: " + source.url)
         detachGame()
      });
   }

   const updateGame = (data: GameResponseSuccess, eTag: string): void => {
      next(AsyncActionCreator.gameRefreshSuccess(data, eTag))    
   }

   const detachGame = (): void => {
      source?.close()
      source = null
   }    
    
   if (action.type !== Type.SSE) {
     return next(action);
   }
   
   switch (action.action) {
      case SseActionNames.GAME_ATTACH_EVENT: {
         attachGame(action.payload);
         break;
      }
      case SseActionNames.GAME_DETACH_EVENT: {
         detachGame();
         break;
      }
   }
}

export default SseMiddleware;