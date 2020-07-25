import * as ActionTypes from './ActionTypes'

export type AppAction = RackAction | BoardAction | SquareAction | PlayerActionsAction;
export type RackAction =  PlayRackLetter | ReturnRackLetters;
export type BoardAction = InitializeBoardSquares | UpdateActiveSquare; 
export type SquareAction = SquareMouseUp | SquareMouseDown | SquareKeyDown;
export type PlayerActionsAction = ShuffleTiles | ReturnLetters | ExchangeLetters | PlayTiles  | PassTurn | ChallengeTurn | ForfeitGame

export interface PlayRackLetter {
  type: typeof ActionTypes.PLAY_RACK_LETTER
  payload: {
    index: number,
    letter: string
  }
}

export interface ReturnRackLetters {
  type: typeof ActionTypes.RETURN_RACK_LETTERS
  payload: {
    letters: string[]
  }
}

export interface InitializeBoardSquares {
  type: typeof ActionTypes.INITIALIZE_BOARD_SQUARES
  payload: {}
}


export interface UpdateActiveSquare {
  type: typeof ActionTypes.UPDATE_ACTIVE_SQUARE,
  payload: {
    index: number
  }
}
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

export interface ShuffleTiles {
  type: typeof ActionTypes.SHUFFLE_LETTERS,
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
export interface ReturnLetters {
  type: typeof ActionTypes.RETURN_LETTERS,
  payload: {} 
} 

export interface ExchangeLetters {
  type: typeof ActionTypes.EXCHANGE_LETTERS,
  payload: {
    indices: number[]
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
export interface ForfeitGame {
  type: typeof ActionTypes.FORFEIT_GAME,
  payload: {} 
}

