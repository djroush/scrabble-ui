import * as Actions from '../actions/Actions';
import * as AsyncActions from '../actions/AsyncActions';
import * as ActionNames from '../actions/ActionNames';
import * as AsyncActionNames from '../actions/AsyncActionNames';

import { AppState, RequestStatus, GameStatus } from '../store/State';
import {inputKeyDown, updateName, updateGameId, joinGame, createGame} from '../reducers/Game';
import {shuffleLetters, returnPlayedLetter, returnPlayedLetters} from '../reducers/Rack';
import {returnExchangeLetterLast, returnExchangeLetters, takeRackLetter, exchangeLetters} from '../reducers/Exchange';

import {getNewBoard} from '../reducers/Board';
import {squareMouseDown, squareMouseUp, squareKeyDown} from '../reducers/Square';
import {createGameRequest, createGameSuccess, createGameFailure} from '../reducers/Service'

const initialState : AppState = {
  game: {
    gameId:null,
    playerId:null,
    status: GameStatus.UNKNOWN,
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
    info: [],
    activePlayerIndex: 0
  },
  service: {
    createGame: {
      status: RequestStatus.UNKNOWN,
      data: null,
      error: null,
    },
    joinGame: {
      status: RequestStatus.UNKNOWN,
      data: null,
      error: null,
    }
  },

};
const AppReducer = (state: AppState = initialState, action: Actions.AppAction) => {
  let newState: AppState = {...state};
  switch (action.action) {
    //GameReducer
    case ActionNames.INPUT_KEYDOWN: {
      const inputKeyDownAction: Actions.InputKeyDown = action;
      const {key, isCreate} = inputKeyDownAction.payload;
      inputKeyDown(newState, key, isCreate);
      
      break;
    }
    case ActionNames.UPDATE_NAME: {
      const updateNameAction: Actions.UpdateName = action;
      const {name} = updateNameAction.payload;
      updateName(newState, name);
      break;
    }
    case ActionNames.UPDATE_GAME_ID: {
      const updateGameIdAction: Actions.UpdateGameId = action;
      const {gameId} = updateGameIdAction.payload;
      updateGameId(newState, gameId);
      break;
    }

    case ActionNames.CREATE_GAME: {
      createGame(newState);
      break;
    }
    case ActionNames.JOIN_GAME: {
       joinGame(newState);
      break;
    }

    //RackReducer    
    case ActionNames.RETURN_PLAYED_LETTER: {
     newState = returnPlayedLetter(newState);
     break; 
    }

    case ActionNames.RETURN_PLAYED_LETTERS: {
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
    case ActionNames.SHUFFLE_LETTERS: {
     newState = shuffleLetters(newState);
     break; 
    }
    
    case ActionNames.EXCHANGE_LETTERS: {
     newState = exchangeLetters(newState);
     break; 
    }

    case ActionNames.EXCHANGE_LETTERS: {
     newState = exchangeLetters(newState);
     break; 
    }
    //ExchangeReducer
    case ActionNames.EXCHANGE_KEYDOWN: {
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
    case ActionNames.INITIALIZE_BOARD_SQUARES: {
      newState.board = getNewBoard();
      break;
    }
    //SquareReducer
    case ActionNames.SQUARE_MOUSEUP: {
     newState = squareMouseUp(newState);
     break; 
    }
    case ActionNames.SQUARE_MOUSEDOWN: {
     const squareMouseDownAction: Actions.SquareMouseDown = action
     const {index} = squareMouseDownAction.payload;
     newState = squareMouseDown(newState, index);
     break; 
    }
    case ActionNames.SQUARE_KEYDOWN: {
     const squareKeyDownAction: Actions.SquareKeyDown = action
     const {index, key, shiftKey} = squareKeyDownAction.payload;
     newState = squareKeyDown(newState, index, key.toLocaleUpperCase(), shiftKey);
     break; 
    }
    case AsyncActionNames.ASYNC_CREATE_GAME_REQUEST: {
     newState = createGameRequest(newState);
     break; 
    }
    case AsyncActionNames.ASYNC_CREATE_GAME_SUCCESS: {
     const asyncCreateGameSuccessAction: AsyncActions.CreateGameSuccess = action;
     const {data} = asyncCreateGameSuccessAction.payload
     newState = createGameSuccess(newState, data);
     break; 
    }
    case AsyncActionNames.ASYNC_CREATE_GAME_FAILURE: {
     const asyncCreateGameFailureAction: AsyncActions.CreateGameFailure = action;
     const {error} = asyncCreateGameFailureAction.payload;
     newState = createGameFailure(newState, error);
     break; 
    }

    default:
  }
  return newState;
}

export default AppReducer;

