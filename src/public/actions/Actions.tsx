import * as ActionTypes from './ActionTypes'

export type AppAction = RackAction | BoardAction | SquareAction | PlayerActionsAction;
export type RackAction =  PlayRackLetter | ReturnRackLetters;
export type BoardAction = InitializeBoardSquares | UpdateActiveSquare; 
export type SquareAction = SquareClicked  | SquareKeyPress;
export type PlayerActionsAction = ShuffleTiles | PlayTiles | ReturnTiles | ExchangeTiles | PassTurn | ChallengeTurn | ForfeitGame

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
export interface SquareClicked {
  type: typeof ActionTypes.SQUARE_CLICKED,
  payload: {
    index: number
  }
}
export interface SquareKeyPress {
  type: typeof ActionTypes.SQUARE_KEYPRESS,
  payload: {
    index: number,
    key: string
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
export interface ReturnTiles {
  type: typeof ActionTypes.RETURN_TILES,
  payload: {} 
} 

export interface ExchangeTiles {
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

