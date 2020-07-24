import * as Actions from './Actions'
import * as ActionTypes from './ActionTypes'

export const playRackLetter = (letter: string, index: number) : Actions.PlayRackLetter => ({
  type: ActionTypes.PLAY_RACK_LETTER,
  payload: {
    index,
    letter,
  }
});
export const returnRackLetters = (letters: string[]) : Actions.ReturnRackLetters => ({
  type: ActionTypes.RETURN_RACK_LETTERS,
  payload: {
    letters
  }
});

export const initializeBoardSquares = () : Actions.InitializeBoardSquares => ({
  type: ActionTypes.INITIALIZE_BOARD_SQUARES,
  payload: {}
});

export const updateActiveSquare = (index: number) : Actions.UpdateActiveSquare => ({
  type: ActionTypes.UPDATE_ACTIVE_SQUARE,
  payload: {
    index
  }
});


export const squareClick = (index: number) : Actions.SquareClicked => ({
  type: ActionTypes.SQUARE_CLICKED,
  payload: {
    index
  }
});
export const squareKeyPress = (index: number, key: string) : Actions.SquareKeyPress => ({
  type: ActionTypes.SQUARE_KEYPRESS,
  payload: {
    index, key
  }
});

export const shuffleLetters = () : Actions.ShuffleTiles => ({
  type: ActionTypes.SHUFFLE_LETTERS,
  payload: {}
});