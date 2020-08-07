import * as ActionNames from './ActionNames'
import {AsyncAction} from '../actions/AsyncActions'


//AppActions
export type AppAction = SyncAction | AsyncAction

//UI interactions triggered by Keyboard, Mouse actions
export type SyncAction = GameUnknownAction | GamePendingAction | RackAction | ExchangeAction | PlayerActionsAction | BoardAction | SquareAction;
export type GameUnknownAction = InputKeyDown | UpdateName | UpdateGameId | CreateGame | JoinGame;
export type GamePendingAction = StartGame;
export type RackAction =  PlayRackLetter | ReturnPlayedLetter | ReturnPlayedLetters | ReturnExchangedLetter | ReturnExchangedLetters;
export type ExchangeAction = ExchangeKeyDown | ExchangeOnClick;
export type PlayerActionsAction = ShuffleTiles | ReturnLetters | ExchangeLetters | PlayTiles  | PassTurn | ChallengeTurn; 
export type GameInfoAction = ForfeitGame;
export type BoardAction = InitializeBoardSquares; 
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


//Rack
export interface PlayRackLetter {
  type: Type,
  action: typeof ActionNames.PLAY_RACK_LETTER
  payload: {
    squareIndex: number,
    letter: string,
    rackIndex?: number
  }
}
export interface ReturnPlayedLetter {
  type: Type,
  action: typeof ActionNames.RETURN_PLAYED_LETTER
  payload: {
    squareIndex: number
    letter: string
  }
}
export interface ReturnPlayedLetters {
  type: Type,
  action: typeof ActionNames.RETURN_PLAYED_LETTERS
  payload: {}
}
export interface ReturnExchangedLetter {
  type: Type,
  action: typeof ActionNames.RETURN_EXCHANGED_LETTER
  payload: {
    index: number,
    letter: string,
  }
}
export interface ReturnExchangedLetters {
  type: Type,
  action: typeof ActionNames.RETURN_EXCHANGED_LETTERS
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
  action: typeof ActionNames.SHUFFLE_LETTERS,
  payload: {} 
}
export interface ReturnLetters {
  type: Type,
  action: typeof ActionNames.RETURN_LETTERS,
  payload: {} 
}
export interface ExchangeLetters {
  type: Type,
  action: typeof ActionNames.EXCHANGE_LETTERS,
  payload: {} 
}
export interface PlayTiles {
  type: Type,
  action: typeof ActionNames.PLAY_TILES,
  payload: {
    tiles: [{
      index: number,
      letter: string
    }]
  } 
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
export interface ForfeitGame {
  type: Type,
  action: typeof ActionNames.FORFEIT_GAME,
  payload: {} 
}

//Board
export interface InitializeBoardSquares {
  type: Type,
  action: typeof ActionNames.INITIALIZE_BOARD_SQUARES
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