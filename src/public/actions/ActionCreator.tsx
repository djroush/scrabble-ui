import * as Actions from './Actions'
import * as ActionTypes from './ActionTypes'

export const updateName = (name: string) : Actions.UpdateName => ({
  type: ActionTypes.UPDATE_NAME,
  payload: {
    name
  }
});
export const updateGameId = (gameId: string) : Actions.UpdateGameId => ({
  type: ActionTypes.UPDATE_GAME_ID,
  payload: {
    gameId
  }
});

export const createGame = () : Actions.CreateGame => ({
  type: ActionTypes.CREATE_GAME,
  payload: {}
});
export const joinGame = () : Actions.JoinGame => ({
  type: ActionTypes.JOIN_GAME,
  payload: {}
});

export const playRackLetter = (letter: string, index: number) : Actions.PlayRackLetter => ({
  type: ActionTypes.PLAY_RACK_LETTER,
  payload: {
    index, letter,
  }
});
export const returnLetters = () : Actions.ReturnLetters => ({
  type: ActionTypes.RETURN_LETTERS,
  payload: {}
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


export const squareMouseUp = () : Actions.SquareMouseUp => ({
  type: ActionTypes.SQUARE_MOUSEUP,
});
export const squareMouseDown = (index: number) : Actions.SquareMouseDown => ({
  type: ActionTypes.SQUARE_MOUSEDOWN,
  payload: {
    index
  }
});

export const squareKeyDown = (index: number, key: string, shiftKey: boolean) : Actions.SquareKeyDown => ({
  type: ActionTypes.SQUARE_KEYDOWN,
  payload: {
    index, key, shiftKey
  }
});

export const shuffleLetters = () : Actions.ShuffleTiles => ({
  type: ActionTypes.SHUFFLE_LETTERS,
  payload: {}
});