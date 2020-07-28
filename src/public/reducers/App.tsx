import * as Actions from '../actions/Actions';
import * as ActionTypes from '../actions/ActionTypes';

import { AppState } from '../store/State';
import {updateName, updateGameId, joinGame, createGame} from '../reducers/Game';
import {shuffleLetters, returnLetters} from '../reducers/Rack';
import {getNewBoard} from '../reducers/Board';
import {squareMouseDown, squareMouseUp, squareKeyDown} from '../reducers/Square';

const initialState : AppState = {
  game: {
    gameId:null,
    playerId:null,
    status: 'PENDING',
    pending: {
      name: '',
      gameId: '',
    }
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
  players: {
    info: [
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
    //GameReducer
    case ActionTypes.UPDATE_NAME: {
      const updateNameAction: Actions.UpdateName = action;
      const {name} = updateNameAction.payload;
      updateName(newState, name);
      break;
    }
    case ActionTypes.UPDATE_GAME_ID: {
      const updateGameIdAction: Actions.UpdateGameId = action;
      const {gameId} = updateGameIdAction.payload;
      updateGameId(newState, gameId);
      break;
    }

    case ActionTypes.CREATE_GAME: {
      createGame(newState);
      newState.board = getNewBoard();
      break;
    }
    case ActionTypes.JOIN_GAME: {
       joinGame(newState);
       newState.board = getNewBoard();
      break;
    }
    
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

