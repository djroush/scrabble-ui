import {Store} from 'redux'

import { AppAction } from '../actions/SyncActions'; 
import {AppState, RequestStatus, GameStatus, StorageState} from '../types/State';
import * as SyncActionNames from '../actions/SyncActionNames';
import * as AsyncActionCreator from '../actions/AsyncActionCreator';

const refreshMiddleware: any =  (store: Store<AppState, AppAction>) => (next: (action: AppAction) => void) => (action: AppAction)  => {
  const refreshGame = (): void => {
    
    let {playerId,id, version} = store.getState().game 
    let eTag = '';

    const storageState: StorageState = JSON.parse(sessionStorage.getItem('gameState'))
    const appState: AppState = store.getState();
    const gameStatus: GameStatus = appState.game.status;
    
    const requestInProgress: boolean = appState.service.gameState.status === RequestStatus.REQUESTING || 
        appState.service.gameRefresh.status === RequestStatus.REQUESTING
    const updateNeeded = gameStatus !== GameStatus.FINISHED && gameStatus !== GameStatus.UNKNOWN && gameStatus !== GameStatus.ABORTED
    const canRejoinPreviousGame: boolean = !!storageState 
    if (!requestInProgress && (updateNeeded || canRejoinPreviousGame)) {

     if (!playerId && !id && canRejoinPreviousGame) {
        const {gameId,playerId:playerId1} = {...storageState}
        id = gameId;
        playerId = playerId1;
        version = "0";
     }

      next(AsyncActionCreator.gameRefreshRequest())
      fetch('http://localhost:8080/scrabble/game/' + id + "/" + playerId , {
        method: 'GET',
        headers: {
          'ETag': version
        },
      }).then((response) => {
        eTag = response.headers.get('ETag');
        if (response.status < 300 || response.status >= 400) {
          return response.json()
        } else {
          next(AsyncActionCreator.gameRefreshSuccess(null, eTag));
        }
      }).then((data) => {
          if (!!data && data.status >= 400) {
            throw new Error(data.message)
          }
          if (data) {
             next(AsyncActionCreator.gameRefreshSuccess(data, eTag));
          }
      }).catch((error) => {
        next(AsyncActionCreator.gameRefreshFailure(error));
      });
    }
  } 

  if (action.action === SyncActionNames.REFRESH_GAME) {
    refreshGame();
  } else {
    next(action);
  }
}

export default refreshMiddleware;