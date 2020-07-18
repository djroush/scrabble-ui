
//Rack stuff
export const PLAY_RACK_LETTER = 'PLAY_RACK_LETTER'
export const RETURN_RACK_LETTERS = 'RETURN_RACK_LETTERS'

// Board stuff
export const UPDATE_ACTIVE_SQUARE = 'UPDATE_ACTIVE_SQUARE'

export type AppAction = RackAction | BoardAction;
export type RackAction =  PlayRackLetterAction | ReturnRackLettersAction;
export type BoardAction = UpdateActiveSquareAction 

export interface PlayRackLetterAction {
  type: typeof PLAY_RACK_LETTER
  payload: {
    index: number,
    letter: string
  }
}

export interface ReturnRackLettersAction {
  type: typeof RETURN_RACK_LETTERS
  payload: {
    letters: string[]
  }
}

export interface UpdateActiveSquareAction {
  type: typeof UPDATE_ACTIVE_SQUARE,
  payload: {
    index: number
  }
}