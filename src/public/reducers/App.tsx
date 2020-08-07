import * as Actions from '../actions/Actions';
import * as AsyncActions from '../actions/AsyncActions';
import * as ActionNames from '../actions/ActionNames';
import * as AsyncActionNames from '../actions/AsyncActionNames';

import { AppState, RequestStatus, GameStatus } from '../store/State';
import {updateName, updateGameId} from '../reducers/Game';
import {shuffleLetters, returnPlayedLetter, returnPlayedLetters} from '../reducers/Rack';
import {returnExchangeLetterLast, returnExchangeLetters, takeRackLetter, exchangeLetters} from '../reducers/Exchange';

import {getNewBoard} from '../reducers/Board';
import {squareMouseDown, squareMouseUp, squareKeyDown} from '../reducers/Square';
import {gameUnknownRequest, gameUnknownSuccess, gameUnknownFailure, gamePendingRequest, gamePendingSuccess, gamePendingFailure} from '../reducers/Service'

const initialState : AppState = {
  game: {
    id:null,
    playerId:null,
    status: GameStatus.UNKNOWN,
    pending: {
      name: '',
      gameId: '',
    }
  },
  rack: {
    letters: [], 
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
    gameUnknown: {
      status: RequestStatus.UNKNOWN,
      data: null,
      error: null,
    },
    gamePending: {
      status: RequestStatus.UNKNOWN,
      data: null,
      error: null,
    },

  },

};
const AppReducer = (state: AppState = initialState, action: Actions.AppAction) => {
  let newState: AppState = {...state};
  switch (action.action) {
    //GameReducer
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
    case AsyncActionNames.ASYNC_GAME_UNKNOWN_REQUEST: {
     newState = gameUnknownRequest(newState);
     break; 
    }
    case AsyncActionNames.ASYNC_GAME_UNKNOWN_SUCCESS: {
     const asyncCreateGameSuccessAction: AsyncActions.GameUnknownSuccess = action;
     const {data} = asyncCreateGameSuccessAction.payload
     newState = gameUnknownSuccess(newState, data);
     break; 
    }
    case AsyncActionNames.ASYNC_GAME_UNKNOWN_FAILURE: {
     const asyncCreateGameFailureAction: AsyncActions.GameUnknownFailure = action;
     const {error} = asyncCreateGameFailureAction.payload;
     newState = gameUnknownFailure(newState, error);
     break; 
    }
    case AsyncActionNames.ASYNC_GAME_PENDING_REQUEST: {
     newState = gamePendingRequest(newState);
     break; 
    }
    case AsyncActionNames.ASYNC_GAME_PENDING_SUCCESS: {
     const asyncGamePendingSuccessAction: AsyncActions.GamePendingSuccess = action;
     const {data} = asyncGamePendingSuccessAction.payload
     newState = gamePendingSuccess(newState, data);
     break; 
    }
    case AsyncActionNames.ASYNC_GAME_PENDING_FAILURE: {
     const asyncGamePendingFailureAction: AsyncActions.GamePendingFailure = action;
     const {error} = asyncGamePendingFailureAction.payload;
     newState = gamePendingFailure(newState, error);
     break; 
    }

    default:
  }
  return newState;
}

export default AppReducer;

