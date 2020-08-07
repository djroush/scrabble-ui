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
        if (data.status >= 400) {
          throw new Error(data.message)
        }
        return data
      }).then((data) => {
        next(AsyncActionCreator.gameUnknownSuccess(data));
      }).catch((error) => {
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
        next(AsyncActionCreator.gameUnknownSuccess(data));
      }).catch((error) => {
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
        next(AsyncActionCreator.gamePendingSuccess(data));
      }).catch((error) => {
        next(AsyncActionCreator.gamePendingFailure(error));
      });
    }
  }
 
    
  if (action.type === Type.SYNC) {
    return next(action);
  }
  
  const appState: AppState = store.getState();
  const {playerId,id, pending} = appState.game;
  const {name, gameId} = pending;
  const queryString = "?player=" + name     //TODO: encode input for playerName?
  
  switch (action.action) {
    case ActionNames.INPUT_KEYDOWN: {
      const inputKeyDownAction = action.payload;
      const {isCreate,key} = inputKeyDownAction;
      if (key === 'Enter') {
        if (isCreate) {
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
  }
};

export default apiMiddleware;