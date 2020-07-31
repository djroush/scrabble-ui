import * as ActionTypes from './ActionTypes'

export type AppAction = GamePendingAction | RackAction | ExchangeAction | PlayerActionsAction | BoardAction | SquareAction;
export type GamePendingAction = InputKeyDown | UpdateName | UpdateGameId | CreateGame | JoinGame;
export type RackAction =  PlayRackLetter | ReturnPlayedLetter | ReturnPlayedLetters | ReturnExchangedLetter | ReturnExchangedLetters;
export type ExchangeAction = ExchangeKeyDown | ExchangeOnClick;
export type PlayerActionsAction = ShuffleTiles | ReturnLetters | ExchangeLetters | PlayTiles  | PassTurn | ChallengeTurn; 
export type GameInfoAction = ForfeitGame;
export type BoardAction = InitializeBoardSquares; 
export type SquareAction = SquareMouseUp | SquareMouseDown | SquareKeyDown

//Game
export interface InputKeyDown {
  type: typeof ActionTypes.INPUT_KEYDOWN
  payload: {
    key: string,
    isCreate: boolean
  }
}
export interface UpdateName {
  type: typeof ActionTypes.UPDATE_NAME
  payload: {
    name: string
  }
}
export interface UpdateGameId {
  type: typeof ActionTypes.UPDATE_GAME_ID
  payload: {
    gameId: string
  }
}
export interface CreateGame {
  type: typeof ActionTypes.CREATE_GAME
  payload: {}
}
export interface JoinGame {
  type: typeof ActionTypes.JOIN_GAME
  payload: {}
}

//Rack
export interface PlayRackLetter {
  type: typeof ActionTypes.PLAY_RACK_LETTER
  payload: {
    squareIndex: number,
    letter: string,
    rackIndex?: number
  }
}
export interface ReturnPlayedLetter {
  type: typeof ActionTypes.RETURN_PLAYED_LETTER
  payload: {
    squareIndex: number
    letter: string
  }
}
export interface ReturnPlayedLetters {
  type: typeof ActionTypes.RETURN_PLAYED_LETTERS
  payload: {}
}
export interface ReturnExchangedLetter {
  type: typeof ActionTypes.RETURN_EXCHANGED_LETTER
  payload: {
    index: number,
    letter: string,
  }
}
export interface ReturnExchangedLetters {
  type: typeof ActionTypes.RETURN_EXCHANGED_LETTERS
  payload: {}
}


//Exchange
export interface ExchangeKeyDown {
  type: typeof ActionTypes.EXCHANGE_KEYDOWN
  payload: {
    key: string,
    isShift: boolean
  }
}
export interface ExchangeOnClick {
  type: typeof ActionTypes.EXCHANGE_ONCLICK
  payload: {
    key: string
  }
}


//PlayerActions
export interface ShuffleTiles {
  type: typeof ActionTypes.SHUFFLE_LETTERS,
  payload: {} 
}
export interface ReturnLetters {
  type: typeof ActionTypes.RETURN_LETTERS,
  payload: {} 
}
export interface ExchangeLetters {
  type: typeof ActionTypes.EXCHANGE_LETTERS,
  payload: {} 
}
export interface PlayTiles {
  type: typeof ActionTypes.PLAY_TILES,
  payload: {
    tiles: [{
      index: number,
      letter: string
    }]
  } 
}
export interface PassTurn {
  type: typeof ActionTypes.PASS_TURN,
  payload: {} 
}
export interface ChallengeTurn {
  type: typeof ActionTypes.CHALLENGE_TURN,
  payload: {} 
}


//GameInfo
export interface ForfeitGame {
  type: typeof ActionTypes.FORFEIT_GAME,
  payload: {} 
}

//Board
export interface InitializeBoardSquares {
  type: typeof ActionTypes.INITIALIZE_BOARD_SQUARES
  payload: {}
}

//Square
export interface SquareMouseUp {
  type: typeof ActionTypes.SQUARE_MOUSEUP,
}
export interface SquareMouseDown {
  type: typeof ActionTypes.SQUARE_MOUSEDOWN,
  payload: {
    index: number
  }
}
export interface SquareKeyDown {
  type: typeof ActionTypes.SQUARE_KEYDOWN,
  payload: {
    index: number,
    key: string,
    shiftKey: boolean,
  }
}