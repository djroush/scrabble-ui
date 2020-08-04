import {Store} from 'redux'

import { AppAction, Type } from '../actions/Actions'; 
import * as ActionNames from '../actions/ActionNames';
import {createGameRequest, createGameSuccess, createGameFailure} from '../actions/AsyncActionCreator';
import {AppState} from '../store/State';


const apiMiddleware: any =  (store: Store<AppState, AppAction>) => (next: (action: AppAction) => void) => (action: AppAction)  => {
    
  if (action.type === Type.SYNC) {
    return next(action);
  }
  
  const appState: AppState = store.getState();
  const playerName = appState.game.pending.name;
  const queryString = "?player=" + playerName     //TODO: encode input for playerName? 
  if (action.action === ActionNames.CREATE_GAME) {
    next(createGameRequest())

    fetch('http://localhost:8080/scrabble/game' + queryString, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      return response.json();
    }).catch((error) => {
      next(createGameFailure(error));
    }).then((data) => {
      next(createGameSuccess(data));
    });
  }
};

export default apiMiddleware;