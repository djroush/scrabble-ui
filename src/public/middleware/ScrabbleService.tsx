import {Store} from 'redux'

import { AppAction, Type } from '../actions/Actions'; 
import * as ActionNames from '../actions/ActionNames';
import * as AsyncActionCreator from '../actions/AsyncActionCreator';
import {AppState, RequestStatus} from '../store/State';


const apiMiddleware: any =  (store: Store<AppState, AppAction>) => (next: (action: AppAction) => void) => (action: AppAction)  => {

  const createGame = (): void => {
    if (appState.service.gameUnknown.status !== RequestStatus.REQUESTING) {
      next(AsyncActionCreator.gameUnknownRequest())
  
      fetch('http://localhost:8080/scrabble/game' + queryString, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        return response.json();
      }).then((data) => {
        //FIXME: data.status == null
        if (data.status >= 400) {
          throw new Error(data.message)
        }
        return data
      }).then((data) => {
        setTimeout(() => awaitPlayers(), 5000);
        next(AsyncActionCreator.gameUnknownSuccess(data));
      }).catch((error) => {
        setTimeout(() => awaitPlayers(), 5000);
        next(AsyncActionCreator.gameUnknownFailure(error));
      });
    }
  }    
   
  const joinGame = (): void => {
    if (appState.service.gameUnknown.status !== RequestStatus.REQUESTING) {
      next(AsyncActionCreator.gameUnknownRequest())
      fetch('http://localhost:8080/scrabble/game/' + gameId + queryString, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        return response.json();
      }).then((data) => {
        if (data.status >= 400) {
          throw new Error(data.message)
        }

        return data
      }).then((data) => {
        setTimeout(() => awaitPlayers(), 5000);
        next(AsyncActionCreator.gameUnknownSuccess(data));
      }).catch((error) => {
        setTimeout(() => awaitPlayers(), 5000);
        next(AsyncActionCreator.gameUnknownFailure(error));
      });
    }
  }    

  const startGame = (): void => {
    if (appState.service.gamePending.status !== RequestStatus.REQUESTING) {
      next(AsyncActionCreator.gamePendingRequest())
      fetch('http://localhost:8080/scrabble/game/' + id + "/" + playerId + "/start", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        return response.json();
      }).then((data) => {
        if (data.status >= 400) {
          throw new Error(data.message)
        }
        return data
      }).then((data) => {
        next(AsyncActionCreator.gamePendingSuccess(data));
      }).catch((error) => {
        next(AsyncActionCreator.gamePendingFailure(error));
      });
    }
  }

  const awaitPlayers = (): void => {
     const {playerId,id, version} = store.getState().game
     let eTag = '';

    //TODO: move this into appState.service.updateGame
    if (appState.service.gameUnknown.status !== RequestStatus.REQUESTING && 
        appState.service.gamePending.status !== RequestStatus.REQUESTING && 
        appState.service.gameRefresh.status !== RequestStatus.REQUESTING) {
      next(AsyncActionCreator.gameRefreshRequest())
      fetch('http://localhost:8080/scrabble/game/' + id + "/" + playerId , {
        method: 'GET',
        headers: {
          'ETag': version
        },
      }).then((response) => {
        //TODO: figure out how to break the chain here
        if (response.status < 300 || response.status >= 400) {
          eTag = response.headers.get('ETag');
          return response.json()
        } else {
          setTimeout(() => awaitPlayers(), 5000);
          next(AsyncActionCreator.gameRefreshSuccess(null, eTag));
        }
      }).then((data) => {
          if (!!data && data.status >= 400) {
            throw new Error(data.message)
          }
          if (data) {
             next(AsyncActionCreator.gameRefreshSuccess(data, eTag));
             if (data.game.state !== 'ABANDONED' && data.game.state !== 'ABORTED' && data.game.state !== 'FINISHED') {
               setTimeout(() => awaitPlayers(), 5000);
             }
          }
      }).catch((error) => {
        setTimeout(() => awaitPlayers(), 5000);

        next(AsyncActionCreator.gameRefreshFailure(error));
      });
    }
  } 
    
  if (action.type === Type.SYNC) {
    return next(action);
  }
  
  const appState: AppState = store.getState();
  const {playerId,id} = appState.game;
  const {name, gameId} = appState.input;
  const queryString = "?player=" + name     //TODO: encode input for playerName?
  
  switch (action.action) {
    case ActionNames.INPUT_KEYDOWN: {
      const inputKeyDownAction = action.payload;
      const {isCreate,key} = inputKeyDownAction;
      if (key === 'Enter') {
        if (isCreate && !!name && name.length > 0) {
          createGame();
        } else if (!!gameId && gameId.length > 0 && !!name && name.length > 0) {
          joinGame();
        } else {
          //Put a user error mentioning validation error here
        }
      }
      
      break;
    }
    case ActionNames.CREATE_GAME: {
      createGame();
      break;
    }
    case ActionNames.JOIN_GAME: {
      joinGame();
      break;
    }
    case ActionNames.START_GAME: {
      startGame();
      break;
    }
    case ActionNames.AWAIT_PLAYERS: {
      awaitPlayers();
      break;
    }

  }
};

export default apiMiddleware;