import * as Actions from './Actions'
import * as ActionTypes from './ActionTypes'

//Game
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
export const playRackLetter = (index: number, letter: string) : Actions.PlayRackLetter => ({
  type: ActionTypes.PLAY_RACK_LETTER,
  payload: {
    index, letter
  }
});
export const returnPlayedLetter = (index: number, letter: string) : Actions.ReturnPlayedLetter => ({
  type: ActionTypes.RETURN_PLAYED_LETTER,
  payload: {
    index,letter
  }
});
export const returnExchangedLetter = (index: number, letter: string) : Actions.ReturnExchangedLetter => ({
  type: ActionTypes.RETURN_EXCHANGED_LETTER,
  payload: { 
    index, letter
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
export const exchangeKeyDown = (key: string) : Actions.ExchangeKeyDown => ({
  type: ActionTypes.EXCHANGE_KEYDOWN,
  payload: {
    key
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
export const squareBlur = (index: number) : Actions.SquareBlur => ({
  type: ActionTypes.SQUARE_BLUR,
  payload: {
    index
  }
});
