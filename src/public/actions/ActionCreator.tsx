import * as Actions from './Actions'
import * as ActionNames from './ActionNames'

//Game
export const inputKeyDown = (key: string, isCreate: boolean) : Actions.InputKeyDown => ({
  type: Actions.Type.ASYNC,
  action: ActionNames.INPUT_KEYDOWN,
  payload: {
    key, isCreate
  }  
}); 

export const updateName = (name: string) : Actions.UpdateName => ({
  type: Actions.Type.SYNC,
  action: ActionNames.UPDATE_NAME,
  payload: {
    name
  }
});
export const updateGameId = (gameId: string) : Actions.UpdateGameId => ({
  type: Actions.Type.SYNC,
  action: ActionNames.UPDATE_GAME_ID,
  payload: {
    gameId
  }
});
export const createGame = () : Actions.CreateGame => ({
  type: Actions.Type.ASYNC,
  action: ActionNames.CREATE_GAME,
  payload: {}
});
export const joinGame = () : Actions.JoinGame => ({
  type: Actions.Type.ASYNC,
  action: ActionNames.JOIN_GAME,
  payload: {}
});
export const startGame = () : Actions.StartGame => ({
  type: Actions.Type.ASYNC,
  action: ActionNames.START_GAME,
  payload: {}
});


//Rack
export const playRackLetter = (squareIndex: number, letter: string, rackIndex?: number) : Actions.PlayRackLetter => ({
  type: Actions.Type.SYNC,
  action: ActionNames.PLAY_RACK_LETTER,
  payload: {
    squareIndex, letter, rackIndex
  }
});
export const returnPlayedLetter = (squareIndex: number, letter: string) : Actions.ReturnPlayedLetter => ({
  type: Actions.Type.SYNC,
  action: ActionNames.RETURN_PLAYED_LETTER,
  payload: {
    squareIndex, letter
  }
});
//Used for click and keypress, index is not required for the latter
export const returnExchangedLetter = (letter: string, index?: number) : Actions.ReturnExchangedLetter => ({
  type: Actions.Type.SYNC,
  action: ActionNames.RETURN_EXCHANGED_LETTER,
  payload: {
    letter, index
  }
});
export const returnPlayedLetters = () : Actions.ReturnPlayedLetters => ({
  type: Actions.Type.SYNC,
  action: ActionNames.RETURN_PLAYED_LETTERS,
  payload: {}
});

export const returnExchangedLetters = () : Actions.ReturnExchangedLetters => ({
  type: Actions.Type.SYNC,
  action: ActionNames.RETURN_EXCHANGED_LETTERS,
  payload: {  }
});

//Exchange
export const exchangeKeyDown = (key: string, isShift: boolean) : Actions.ExchangeKeyDown => ({
  type: Actions.Type.SYNC,
  action: ActionNames.EXCHANGE_KEYDOWN,
  payload: {
    key, isShift
  }
});

//PlayerActions
export const shuffleLetters = () : Actions.ShuffleTiles => ({
  type: Actions.Type.SYNC,
  action: ActionNames.SHUFFLE_LETTERS,
  payload: {}
});
export const returnLetters = () : Actions.ReturnLetters => ({
  type: Actions.Type.SYNC,
  action: ActionNames.RETURN_LETTERS,
  payload: {}
});
export const exchangeLetters = () : Actions.ExchangeLetters => ({
  type: Actions.Type.SYNC,
  action: ActionNames.EXCHANGE_LETTERS,
  payload: {}
});


//Board
export const initializeBoardSquares = () : Actions.InitializeBoardSquares => ({
  type: Actions.Type.SYNC,
  action: ActionNames.INITIALIZE_BOARD_SQUARES,
  payload: {}
});

//Square
export const squareMouseUp = () : Actions.SquareMouseUp => ({
  type: Actions.Type.SYNC,
  action: ActionNames.SQUARE_MOUSEUP,
  payload: {}
});
export const squareMouseDown = (index: number) : Actions.SquareMouseDown => ({
  type: Actions.Type.SYNC,
  action: ActionNames.SQUARE_MOUSEDOWN,
  payload: {
    index
  }
});
export const squareKeyDown = (index: number, key: string, shiftKey: boolean) : Actions.SquareKeyDown => ({
  type: Actions.Type.SYNC,
  action: ActionNames.SQUARE_KEYDOWN,
  payload: {
    index, key, shiftKey
  }
});



