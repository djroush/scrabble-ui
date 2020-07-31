import * as Actions from './Actions'
import * as ActionTypes from './ActionTypes'

//Game
export const inputKeyDown = (key: string, isCreate: boolean) : Actions.InputKeyDown => ({
  type: ActionTypes.INPUT_KEYDOWN,
  payload: {
    key, isCreate
  }  
}); 

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


//Rack
export const playRackLetter = (squareIndex: number, letter: string, rackIndex?: number) : Actions.PlayRackLetter => ({
  type: ActionTypes.PLAY_RACK_LETTER,
  payload: {
    squareIndex, letter, rackIndex
  }
});
export const returnPlayedLetter = (squareIndex: number, letter: string) : Actions.ReturnPlayedLetter => ({
  type: ActionTypes.RETURN_PLAYED_LETTER,
  payload: {
    squareIndex, letter
  }
});
//Used for click and keypress, index is not required for the latter
export const returnExchangedLetter = (letter: string, index?: number) : Actions.ReturnExchangedLetter => ({
  type: ActionTypes.RETURN_EXCHANGED_LETTER,
  payload: {
    letter, index
  }
});
export const returnPlayedLetters = () : Actions.ReturnPlayedLetters => ({
  type: ActionTypes.RETURN_PLAYED_LETTERS,
  payload: {}
});

export const returnExchangedLetters = () : Actions.ReturnExchangedLetters => ({
  type: ActionTypes.RETURN_EXCHANGED_LETTERS,
  payload: {  }
});

//Exchange
export const exchangeKeyDown = (key: string, isShift: boolean) : Actions.ExchangeKeyDown => ({
  type: ActionTypes.EXCHANGE_KEYDOWN,
  payload: {
    key, isShift
  }
});

//PlayerActions
export const shuffleLetters = () : Actions.ShuffleTiles => ({
  type: ActionTypes.SHUFFLE_LETTERS,
  payload: {}
});
export const returnLetters = () : Actions.ReturnLetters => ({
  type: ActionTypes.RETURN_LETTERS,
  payload: {}
});
export const exchangeLetters = () : Actions.ExchangeLetters => ({
  type: ActionTypes.EXCHANGE_LETTERS,
  payload: {}
});



//Board
export const initializeBoardSquares = () : Actions.InitializeBoardSquares => ({
  type: ActionTypes.INITIALIZE_BOARD_SQUARES,
  payload: {}
});

//Square
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
