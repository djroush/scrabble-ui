import * as Actions from './Actions'
import ActionTypes from './ActionTypes'
import { AppState } from './State';

const initialState : AppState  = {
  rack: {
    letters: ['T','E','S','T','I','N','G'], 
  },
  board: {
    activeIndex: null,
    direction: null,
    squares: [],
  },
  playerDisplay: {
    players: [
      {name: 'Dough',score:26},
      {name: 'Friedrich',score:18},
      {name: 'Sebastian',score:28},
      {name: 'Theodore',score:11}
    ],
    activePlayerIndex: 0
  }
}

const AppReducer = (state: AppState, action: Actions.AppAction) => {
  switch (action.type) {
    case ActionTypes.PLAY_RACK_LETTERS: 
      return state
    case ActionTypes.RETURN_RACK_LETTERS:
      return state;
    default:
      return state
  }
}

import {createStore} from 'redux';

const store = createStore(AppReducer); //add initialstate here


export function getStore () {
  return store;
}

export default AppReducer;

