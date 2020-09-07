import {Store} from 'redux'

import { AppAction } from '../actions/Actions'; 
import {AppState, RequestStatus, GameStatus} from '../store/State';
import * as ActionNames from '../actions/ActionNames';
import * as AsyncActionCreator from '../actions/AsyncActionCreator';

const refreshMiddleware: any =  (store: Store<AppState, AppAction>) => (next: (action: AppAction) => void) => (action: AppAction)  => {
  const refreshGame = (): void => {
     const {playerId,id, version} = store.getState().game
     let eTag = '';

    const appState: AppState = store.getState();
    const gameStatus: GameStatus = appState.game.status;
    if (appState.service.gameState.status !== RequestStatus.REQUESTING && 
        appState.service.gameRefresh.status !== RequestStatus.REQUESTING && 
        (gameStatus !== GameStatus.FINISHED && gameStatus !== GameStatus.UNKNOWN && gameStatus !== GameStatus.ABORTED)) {

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

  if (action.action === ActionNames.REFRESH_GAME) {
    refreshGame();
  } else {
    next(action);
  }
}

export default refreshMiddleware;