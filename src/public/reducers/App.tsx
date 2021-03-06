import { AppAction } from '../actions';
import * as SyncActions from '../actions/SyncActions';
import * as AsyncActions from '../actions/AsyncActions';
import * as SyncActionNames from '../actions/SyncActionNames';
import * as AsyncActionNames from '../actions/AsyncActionNames';

import { AppState, RequestStatus, GameStatus } from '../types/State';
import {updateName, updateGameId} from '../reducers/Game';
import {shuffleTiles, returnPlayedTile, returnPlayedTiles} from '../reducers/Rack';
import {returnExchangeTileLast, returnExchangeTiles, takeRackTile} from '../reducers/Exchange';

import {squareMouseDown, squareMouseUp, squareKeyDown} from '../reducers/Square';
import {gameUnknownRequest, gameUnknownSuccess, gameUnknownFailure, gamePendingRequest, gamePendingSuccess, gamePendingFailure,
  gameRefreshRequest, gameRefreshSuccess, gameRefreshFailure, gameActiveRequest,  gameActiveSuccess,  gameActiveFailure } from '../reducers/Service'

const initialState : AppState = {
  input: {
    name: '',
    gameId: '',    
  },
  game: {
    version: null,
    id:null,
    playerId:null,
    playerIndex: -1,
    activePlayerIndex: -1,
    isPlayerUp: false,
    status: GameStatus.UNKNOWN,
    canChallenge: false,
    winningPlayerIndex: -1
  },
  rack: {
    tiles: [], 
    sortedTiles:[]
  },
  exchange: {
    tiles: [], 
  },
  board: {
    activeIndex: null,
    focusedIndex: null,
    squares: null,
  },
  turn: {
    playedTiles:[]
  },
  lastTurn: {
    action: 'UNKNOWN',
    state: null,
    playerIndex: -1,
    points: 0,
    wordsPlayed: null,
    newTileIndexes: [],
    enactChallenge: null
  },
  players: [],
  service: {
    gameState: {
      status: RequestStatus.UNKNOWN,
      error: null,
    }
  },

};
const AppReducer = (state: AppState = initialState, action: AppAction) => {
  let newState: AppState = {...state};
  switch (action.action) {
    //GameReducer
    case SyncActionNames.UPDATE_NAME: {
      const updateNameAction: SyncActions.UpdateName = action;
      const {name} = updateNameAction.payload;
      updateName(newState, name);
      break;
    }
    case SyncActionNames.UPDATE_GAME_ID: {
      const updateGameIdAction: SyncActions.UpdateGameId = action;
      const {gameId} = updateGameIdAction.payload;
      updateGameId(newState, gameId);
      break;
    }

    //RackReducer    
    case SyncActionNames.RETURN_PLAYED_TILE: {
     newState = returnPlayedTile(newState);
     break; 
    }

    case SyncActionNames.RETURN_PLAYED_TILES: {
      const hasPlayedLetters: boolean  = newState.turn.playedTiles.length > 0;
      const hasExchangeLetters: boolean =  newState.exchange.tiles.length > 0;
      if (hasPlayedLetters) {
        newState = returnPlayedTiles(newState);
      }
      if (hasExchangeLetters) {
        newState = returnExchangeTiles(newState);
      }

     break; 
    }
    //PlayerActions    
    case SyncActionNames.SHUFFLE_TILES: {
     newState = shuffleTiles(newState);
     break; 
    }
    
    //ExchangeReducer
    case SyncActionNames.EXCHANGE_KEYDOWN: {
      const exchangeKeyDownAction: SyncActions.ExchangeKeyDown = action
      const {key, isShift} = exchangeKeyDownAction.payload;
      if (key === 'Backspace') {
        if (isShift) {
          newState = returnExchangeTiles(newState);
        } else {
          newState = returnExchangeTileLast(newState);
        }
      } else {
        newState = takeRackTile(newState, key);
      }
      break;
    }
    //GameInfo
    case SyncActionNames.NEW_GAME: {
      const {input} = newState;
      input.gameId = ''
      newState = {...initialState, input}
      sessionStorage.removeItem('gameState');
      break;
    }
    //SquareReducer
    case SyncActionNames.SQUARE_MOUSEUP: {
     newState = squareMouseUp(newState);
     break; 
    }
    case SyncActionNames.SQUARE_MOUSEDOWN: {
     const squareMouseDownAction: SyncActions.SquareMouseDown = action
     const {index} = squareMouseDownAction.payload;
     newState = squareMouseDown(newState, index);
     break; 
    }
    case SyncActionNames.SQUARE_KEYDOWN: {
     const squareKeyDownAction: SyncActions.SquareKeyDown = action
     const {index, key, shiftKey} = squareKeyDownAction.payload;
     newState = squareKeyDown(newState, index, key.toLocaleUpperCase(), shiftKey);
     break; 
    }
    case AsyncActionNames.ASYNC_GAME_UNKNOWN_REQUEST: {
     newState = gameUnknownRequest(newState);
     break; 
    }
    case AsyncActionNames.ASYNC_GAME_UNKNOWN_SUCCESS: {
      const asyncGameUnkownSuccessAction: AsyncActions.GameUnknownSuccess = action;
      const {payload} = asyncGameUnkownSuccessAction
      
     newState = gameUnknownSuccess(newState, payload);
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
     newState = gamePendingSuccess(newState);
     break; 
    }
    case AsyncActionNames.ASYNC_GAME_PENDING_FAILURE: {
     const asyncGamePendingFailureAction: AsyncActions.GamePendingFailure = action;
     const {error} = asyncGamePendingFailureAction.payload;
     newState = gamePendingFailure(newState, error);
     break; 
    }
    case AsyncActionNames.ASYNC_GAME_REFRESH_REQUEST: {
      newState = gameRefreshRequest(newState);
      break; 
     }
     case AsyncActionNames.ASYNC_GAME_REFRESH_SUCCESS: {
      const asyncGameRefreshSuccessAction: AsyncActions.GameRefreshSuccess = action;
      const {data, eTag} = asyncGameRefreshSuccessAction.payload
      
      newState = gameRefreshSuccess(newState, data, eTag);
      break; 
     }
     case AsyncActionNames.ASYNC_GAME_REFRESH_FAILURE: {
      const asyncGameRefreshFailureAction: AsyncActions.GameRefreshFailure = action;
      const {error} = asyncGameRefreshFailureAction.payload;
      newState = gameRefreshFailure(newState, error);
      break; 
     }
    case AsyncActionNames.ASYNC_GAME_ACTIVE_REQUEST: {
     newState = gameActiveRequest(newState);
     break; 
    }
  case AsyncActionNames.ASYNC_GAME_ACTIVE_SUCCESS: {
   newState = gameActiveSuccess(newState);
   break; 
  }
  case AsyncActionNames.ASYNC_GAME_ACTIVE_FAILURE: {
   const asyncGameActiveFailureAction: AsyncActions.GameActiveFailure = action;
   const {error} = asyncGameActiveFailureAction.payload;
   newState = gameActiveFailure(newState, error);
   break; 
  }
  default:
  }
  return newState;
}

export default AppReducer;

