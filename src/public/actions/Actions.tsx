import { PLAY_RACK_LETTER, RETURN_RACK_LETTERS, UPDATE_ACTIVE_SQUARE } from './ActionTypes'

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
