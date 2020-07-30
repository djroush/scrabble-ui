import * as Actions from '../actions/Actions';
import * as ActionTypes from '../actions/ActionTypes';

import { AppState } from '../store/State';
import {updateName, updateGameId, joinGame, createGame} from '../reducers/Game';
import {shuffleLetters, returnPlayedLetter, returnPlayedLetters} from '../reducers/Rack';
import {takeRackLetter, exchangeLetters} from '../reducers/Exchange';

import {getNewBoard} from '../reducers/Board';
import {squareMouseDown, squareMouseUp, squareKeyDown, squareBlur} from '../reducers/Square';

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
  exchange: {
    letters: [], 
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
      {name: 'THEODORE',score:26},
      {name: 'FREIDRICH',score:18},
      {name: 'SEBASTIAN',score:28},
      {name: 'RUTHERFORD',score:11}
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

    //RackReducer
    case ActionTypes.RETURN_PLAYED_LETTER: {
     newState = returnPlayedLetter(newState);
     break; 
    }

    case ActionTypes.RETURN_PLAYED_LETTERS: {
     newState = returnPlayedLetters(newState);
     break; 
    }
    //PlayerActions    
    case ActionTypes.SHUFFLE_LETTERS: {
     newState = shuffleLetters(newState);
     break; 
    }
    
    case ActionTypes.EXCHANGE_LETTERS: {
     newState = exchangeLetters(newState);
     break; 
    }

    case ActionTypes.EXCHANGE_LETTERS: {
     newState = exchangeLetters(newState);
     break; 
    }
    //ExchangeReducer
    case ActionTypes.EXCHANGE_KEYDOWN: {
      const exchangeKeyDownAction: Actions.ExchangeKeyDown = action
      const {key} = exchangeKeyDownAction.payload;
      newState = takeRackLetter(newState, key);
      break;
    }
    //BoardReducer
    case ActionTypes.INITIALIZE_BOARD_SQUARES: {
      newState.board = getNewBoard();
      break;
    }
    //SquareReducer
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
    case ActionTypes.SQUARE_BLUR: {
      const squareBlurAction: Actions.SquareBlur = action;
      const {index} = squareBlurAction.payload;
      newState = squareBlur(newState, index);
    }
     
    default:
  }
  return newState;
}

export default AppReducer;

