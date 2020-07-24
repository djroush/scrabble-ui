import * as Actions from '../actions/Actions';
import * as ActionTypes from '../actions/ActionTypes';

import { AppState } from '../store/State';
import {shuffleLetters} from '../reducers/Rack';
import {getNewBoard} from '../reducers/Board';
import {squareClick, squareKeyPress} from '../reducers/Square';

const initialState : AppState = {
  rack: {
    letters: ['T','E','S','T','I','N','G'], 
  },
  board: {
    activeIndex: null,
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
    case ActionTypes.SQUARE_CLICKED: {
     const squareClickedAction: Actions.SquareClicked = action
     const {index} = squareClickedAction.payload;
     newState = squareClick(newState, index);
     break; 
    }
    case ActionTypes.SQUARE_KEYPRESS: {
     const squareKeyPressAction: Actions.SquareKeyPress = action
     const {index, key} = squareKeyPressAction.payload;
     newState = squareKeyPress(newState, index, key.toLocaleUpperCase());
     break; 
    }
     
    case ActionTypes.SHUFFLE_LETTERS: {
     newState = shuffleLetters(newState);
     break; 
    }
    default:
  }
  return newState;
}

export default AppReducer;

