import * as Actions from '../actions/Actions';
import * as ActionTypes from '../actions/ActionTypes';

import { AppState } from '../store/State';
import {takeFromRack} from './RackReducer';
import {getNewBoard, updateActiveSquare} from './BoardReducer';

const initialState : AppState = {
  rack: {
    letters: ['T','E','S','T','I','N','G'], 
  },
  board: {
    activeIndex: null,
    squares: null,
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
    //RackReducer
    case ActionTypes.PLAY_RACK_LETTER: {
      const playRackLetterAction: Actions.PlayRackLetter = action; 
      const {index, letter} = playRackLetterAction.payload;
      newState = takeFromRack(newState, letter, index);
      break;
    }
    //BoardReducer
    case ActionTypes.INITIALIZE_BOARD_SQUARES: {
      newState.board = getNewBoard();
      break;
    }
    case ActionTypes.SQUARE_CLICKED: {
     const squareClickedAction: Actions.SquareClicked = action
     const {index} = squareClickedAction.payload;
     newState = updateActiveSquare(newState, index); 
    } 
    default:
  }
  return newState;
}

export default AppReducer;

