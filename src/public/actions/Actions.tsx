import * as ActionNames from './ActionNames'
import {AsyncAction} from '../actions/AsyncActions'

import {Tile} from '../store/State';

//AppActions
export type AppAction = SyncAction | AsyncAction

//UI interactions triggered by Keyboard, Mouse actions
export type SyncAction = GameUnknownAction | GamePendingAction | RackAction | ExchangeAction | PlayerActionsAction | GameInfoAction | SquareAction;
export type GameUnknownAction = InputKeyDown | UpdateName | UpdateGameId | CreateGame | JoinGame;
export type GamePendingAction = StartGame | RefreshGame;
export type RackAction =  PlayRackTile | ReturnPlayedTile | ReturnPlayedTiles | ReturnExchangedTile | ReturnExchangedTiles;
export type ExchangeAction = ExchangeKeyDown | ExchangeOnClick;
export type PlayerActionsAction = ShuffleTiles | ReturnTiles | ExchangeTiles | PlayTiles  | PassTurn | ChallengeTurn; 
export type GameInfoAction = LeaveGame | ForfeitGame | NewGame;
export type SquareAction = SquareMouseUp | SquareMouseDown | SquareKeyDown

export enum Type {
    SYNC, ASYNC
}
//Game
export interface InputKeyDown {
  type: Type,
  action: typeof ActionNames.INPUT_KEYDOWN
  payload: {
    key: string,
    isCreate: boolean
  }
}
export interface UpdateName {
  type: Type,
  action: typeof ActionNames.UPDATE_NAME
  payload: {
    name: string
  }
}
export interface UpdateGameId {
  type: Type,
  action: typeof ActionNames.UPDATE_GAME_ID
  payload: {
    gameId: string
  }
}
export interface CreateGame {
  type: Type,
  action: typeof ActionNames.CREATE_GAME
  payload: {}
}
export interface JoinGame {
  type: Type,
  action: typeof ActionNames.JOIN_GAME
  payload: {}
}
export interface StartGame {
  type: Type,
  action: typeof ActionNames.START_GAME
  payload: {}
}
export interface RefreshGame {
  type: Type,
  action: typeof ActionNames.REFRESH_GAME
  payload: {}
}


//Rack
export interface PlayRackTile {
  type: Type,
  action: typeof ActionNames.PLAY_RACK_TILE
  payload: {
    squareIndex: number,
    tile: Tile,
    rackIndex?: number
  }
}
export interface ReturnPlayedTile {
  type: Type,
  action: typeof ActionNames.RETURN_PLAYED_TILE
  payload: {
    squareIndex: number
    tile: Tile
  }
}
export interface ReturnPlayedTiles {
  type: Type,
  action: typeof ActionNames.RETURN_PLAYED_TILES
  payload: {}
}
export interface ReturnExchangedTile {
  type: Type,
  action: typeof ActionNames.RETURN_EXCHANGED_TILE
  payload: {
    index: number,
    tile: Tile,
  }
}
export interface ReturnExchangedTiles {
  type: Type,
  action: typeof ActionNames.RETURN_EXCHANGED_TILES
  payload: {}
}


//Exchange
export interface ExchangeKeyDown {
  type: Type,
  action: typeof ActionNames.EXCHANGE_KEYDOWN
  payload: {
    key: string,
    isShift: boolean
  }
}
export interface ExchangeOnClick {
  type: Type,
  action: typeof ActionNames.EXCHANGE_ONCLICK
  payload: {
    key: string
  }
}


//PlayerActions
export interface ShuffleTiles {
  type: Type,
  action: typeof ActionNames.SHUFFLE_TILES,
  payload: {} 
}
export interface ReturnTiles {
  type: Type,
  action: typeof ActionNames.RETURN_TILES,
  payload: {} 
}
export interface ExchangeTiles {
  type: Type,
  action: typeof ActionNames.EXCHANGE_TILES,
  payload: {} 
}
export interface PlayTiles {
  type: Type,
  action: typeof ActionNames.PLAY_TILES,
  payload: {} 
}
export interface PassTurn {
  type: Type,
  action: typeof ActionNames.PASS_TURN,
  payload: {} 
}
export interface ChallengeTurn {
  type: Type,
  action: typeof ActionNames.CHALLENGE_TURN,
  payload: {} 
}


//GameInfo
export interface LeaveGame {
  type: Type,
  action: typeof ActionNames.LEAVE_GAME,
  payload: {} 
}
export interface ForfeitGame {
  type: Type,
  action: typeof ActionNames.FORFEIT_GAME,
  payload: {} 
}
export interface NewGame {
  type: Type,
  action: typeof ActionNames.NEW_GAME,
  payload: {} 
}

//Square
export interface SquareMouseUp {
  type: Type,
  action: typeof ActionNames.SQUARE_MOUSEUP,
  payload: {}
}
export interface SquareMouseDown {
  type: Type,
  action: typeof ActionNames.SQUARE_MOUSEDOWN,
  payload: {
    index: number
  }
}
export interface SquareKeyDown {
  type: Type,
  action: typeof ActionNames.SQUARE_KEYDOWN,
  payload: {
    index: number,
    key: string,
    shiftKey: boolean,
  }
}