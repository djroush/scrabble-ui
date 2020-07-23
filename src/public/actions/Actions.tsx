import * as ActionTypes from './ActionTypes'

export type AppAction = RackAction | BoardAction | SquareAction;
export type RackAction =  PlayRackLetter | ReturnRackLetters;
export type BoardAction = InitializeBoardSquares | UpdateActiveSquare; 
export type SquareAction = SquareClicked  | SquareKeyPress;

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