import * as Actions from '../actions/Actions';
import * as ActionTypes from '../actions/ActionTypes';

import { AppState } from '../store/State';
import {inputKeyDown, updateName, updateGameId, joinGame, createGame} from '../reducers/Game';
import {shuffleLetters, returnPlayedLetter, returnPlayedLetters} from '../reducers/Rack';
import {returnExchangeLetterLast, returnExchangeLetters, takeRackLetter, exchangeLetters} from '../reducers/Exchange';

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
    case ActionTypes.INPUT_KEYDOWN: {
      const inputKeyDownAction: Actions.InputKeyDown = action;
      const {key, isCreate} = inputKeyDownAction.payload;
      inputKeyDown(newState, key, isCreate);
      
      break;
    }
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
      break;
    }
    case ActionTypes.JOIN_GAME: {
       joinGame(newState);
      break;
    }

    //RackReducer    
    case ActionTypes.RETURN_PLAYED_LETTER: {
     newState = returnPlayedLetter(newState);
     break; 
    }

    case ActionTypes.RETURN_PLAYED_LETTERS: {
      const hasPlayedLetters: boolean  = newState.turn.tiles.length > 0;
      const hasExchangeLetters: boolean =  newState.exchange.letters.length > 0;
      if (hasPlayedLetters) {
        newState = returnPlayedLetters(newState);
      }
      if (hasExchangeLetters) {
        newState = returnExchangeLetters(newState);
      }

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
      const {key, isShift} = exchangeKeyDownAction.payload;
      if (key === 'Backspace') {
        if (isShift) {
          newState = returnExchangeLetters(newState);
        } else {
          newState = returnExchangeLetterLast(newState);
        }
      } else {
        newState = takeRackLetter(newState, key);
      }
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
    default:
  }
  return newState;
}

export default AppReducer;

