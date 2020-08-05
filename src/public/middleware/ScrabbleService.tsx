import {Store} from 'redux'

import { AppAction, Type } from '../actions/Actions'; 
import * as ActionNames from '../actions/ActionNames';
import * as AsyncActionCreator from '../actions/AsyncActionCreator';
import {AppState, RequestStatus} from '../store/State';


const apiMiddleware: any =  (store: Store<AppState, AppAction>) => (next: (action: AppAction) => void) => (action: AppAction)  => {
    
  if (action.type === Type.SYNC) {
    return next(action);
  }
  
  const appState: AppState = store.getState();
  const {name, gameId} = appState.game.pending;
  const queryString = "?player=" + name     //TODO: encode input for playerName? 
  if (action.action === ActionNames.CREATE_GAME) {
    if (appState.service.gamePending.status !== RequestStatus.REQUESTING) {
      next(AsyncActionCreator.createGameRequest())
  
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
        next(AsyncActionCreator.createGameSuccess(data));
      }).catch((error) => {
        next(AsyncActionCreator.createGameFailure(error));
      });
    }
  } else if (action.action === ActionNames.JOIN_GAME) {
    if (appState.service.gamePending.status !== RequestStatus.REQUESTING) {
      next(AsyncActionCreator.joinGameRequest())
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
        next(AsyncActionCreator.createGameSuccess(data));
      }).catch((error) => {
        next(AsyncActionCreator.createGameFailure(error));
      });
    }
  }
};

export default apiMiddleware;