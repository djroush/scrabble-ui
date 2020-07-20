import { PLAY_RACK_LETTER, RETURN_RACK_LETTERS, UPDATE_ACTIVE_SQUARE } from './ActionTypes'
import * as Actions from './Actions'

export const playRackLetter = (letter: string, index: number) : Actions.PlayRackLetterAction => ({
  type: PLAY_RACK_LETTER,
  payload: {
    index,
    letter,
  }
});
export const returnRackLetters = (letters: string[]) : Actions.ReturnRackLettersAction => ({
  type: RETURN_RACK_LETTERS,
  payload: {
    letters
  }
});

export const updateActiveSquare = (index: number) : Actions.UpdateActiveSquareAction => ({
  type: UPDATE_ACTIVE_SQUARE,
  payload: {
    index
  }
});