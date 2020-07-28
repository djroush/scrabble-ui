import * as Actions from '../actions/Actions';
import * as ActionTypes from '../actions/ActionTypes';

import { AppState } from '../store/State';
import {shuffleLetters, returnLetters} from '../reducers/Rack';
import {getNewBoard} from '../reducers/Board';
import {squareMouseDown, squareMouseUp, squareKeyDown} from '../reducers/Square';

const initialState : AppState = {
  game: {
    gameId:null,
    playerId:null,
    status: 'ACTIVE'
  },
  rack: {
    letters: ['T','E','S','T','I','N','G'], 
  },
  board: {
    activeIndex: null,
    focusedIndex: null,
    squares: null,
  },
  turn: {
    tiles:[]
  },
  playerDisplay: {
    players: [
      {name: 'Rutherford',score:26},
      {name: 'Friedrich',score:18},
      {name: 'Sebastian',score:28},
      {name: 'Theodore',score:11}
    ],
    activePlayerIndex: 0
  }
};
const AppReducer = (state: AppState = initialState, action: Actions.AppAction) => {
  let newState: AppState = {...state};
  switch (action.type) {
    //BoardReducer
    case ActionTypes.INITIALIZE_BOARD_SQUARES: {
      newState.board = getNewBoard();
      break;
    }
    case ActionTypes.SQUARE_MOUSEUP: {
     newState = squareMouseUp(newState);
     break; 
    }
    case ActionTypes.SQUARE_MOUSEDOWN: {
     const squareMouseDownAction: Actions.SquareMouseDown = action
     const {index} = squareMouseDownAction.payload;
     newState = squareMouseDown(newState, index);
     break; 
    }
    case ActionTypes.SQUARE_KEYDOWN: {
     const squareKeyDownAction: Actions.SquareKeyDown = action
     const {index, key, shiftKey} = squareKeyDownAction.payload;
     newState = squareKeyDown(newState, index, key.toLocaleUpperCase(), shiftKey);
     break; 
    }
     
    case ActionTypes.SHUFFLE_LETTERS: {
     newState = shuffleLetters(newState);
     break; 
    }
    case ActionTypes.RETURN_LETTERS: {
     newState = returnLetters(newState);
     break; 
    }

    default:
  }
  return newState;
}

export default AppReducer;

