import * as Actions from './SyncActions'
import * as ActionNames from './SyncActionNames'

import {Type} from '.'
import {Tile} from '../types/State'

//App
export const refreshGame = () : Actions.RefreshGame => ({
  type: Type.SYNC,
  action: ActionNames.REFRESH_GAME,
  payload: {}
});

//GameUnknown
export const inputKeyDown = (key: string, isCreate: boolean) : Actions.InputKeyDown => ({
  type: Type.SYNC,
  action: ActionNames.INPUT_KEYDOWN,
  payload: {
    key, isCreate
  }  
}); 

export const updateName = (name: string) : Actions.UpdateName => ({
  type: Type.SYNC,
  action: ActionNames.UPDATE_NAME,
  payload: {
    name
  }
});
export const updateGameId = (gameId: string) : Actions.UpdateGameId => ({
  type: Type.SYNC,
  action: ActionNames.UPDATE_GAME_ID,
  payload: {
    gameId
  }
});
export const createGame = () : Actions.CreateGame => ({
  type: Type.ASYNC,
  action: ActionNames.CREATE_GAME,
  payload: {}
});
export const joinGame = () : Actions.JoinGame => ({
  type: Type.ASYNC,
  action: ActionNames.JOIN_GAME,
  payload: {}
});

//GamePending
export const startGame = () : Actions.StartGame => ({
  type: Type.ASYNC,
  action: ActionNames.START_GAME,
  payload: {}
});


//Rack
export const playRackTile = (squareIndex: number, tile: Tile, rackIndex?: number) : Actions.PlayRackTile => ({
  type: Type.SYNC,
  action: ActionNames.PLAY_RACK_TILE,
  payload: {
    squareIndex, tile, rackIndex
  }
});
export const returnPlayedTile = (squareIndex: number, tile: Tile) : Actions.ReturnPlayedTile => ({
  type: Type.SYNC,
  action: ActionNames.RETURN_PLAYED_TILE,
  payload: {
    squareIndex, tile
  }
});
export const returnPlayedTiles = () : Actions.ReturnPlayedTiles => ({
  type: Type.SYNC,
  action: ActionNames.RETURN_PLAYED_TILES,
  payload: {}
});

export const returnExchangedTiles = () : Actions.ReturnExchangedTiles => ({
  type: Type.SYNC,
  action: ActionNames.RETURN_EXCHANGED_TILES,
  payload: {  }
});

//Exchange
export const exchangeKeyDown = (key: string, isShift: boolean) : Actions.ExchangeKeyDown => ({
  type: Type.SYNC,
  action: ActionNames.EXCHANGE_KEYDOWN,
  payload: {
    key, isShift
  }
});

//PlayerActions
export const shuffleTiles = () : Actions.ShuffleTiles => ({
  type: Type.SYNC,
  action: ActionNames.SHUFFLE_TILES,
  payload: {}
});
export const returnTiles = () : Actions.ReturnTiles => ({
  type: Type.SYNC,
  action: ActionNames.RETURN_TILES,
  payload: {}
});
export const exchangeTiles = () : Actions.ExchangeTiles => ({
  type: Type.ASYNC,
  action: ActionNames.EXCHANGE_TILES,
  payload: {}
});
export const playTiles = () : Actions.PlayTiles => ({
  type: Type.ASYNC,
  action: ActionNames.PLAY_TILES,
  payload: {}
});
export const passTurn = () : Actions.PassTurn => ({
  type: Type.ASYNC,
  action: ActionNames.PASS_TURN,
  payload: {}
});
export const challengeTurn = (challenge: boolean) : Actions.ChallengeTurn => ({
  type: Type.ASYNC,
  action: ActionNames.CHALLENGE_TURN,
  payload: { challenge }
});


//GameInfo 
export const leaveGame = () : Actions.LeaveGame => ({
  type: Type.ASYNC,
  action: ActionNames.LEAVE_GAME,
  payload: {}
});
export const forfeitGame = () : Actions.ForfeitGame => ({
  type: Type.ASYNC,
  action: ActionNames.FORFEIT_GAME,
  payload: {}
});
export const newGame = () : Actions.NewGame => ({
  type: Type.SYNC,
  action: ActionNames.NEW_GAME,
  payload: {}
});

//Square
export const squareMouseUp = () : Actions.SquareMouseUp => ({
  type: Type.SYNC,
  action: ActionNames.SQUARE_MOUSEUP,
  payload: {}
});
export const squareMouseDown = (index: number) : Actions.SquareMouseDown => ({
  type: Type.SYNC,
  action: ActionNames.SQUARE_MOUSEDOWN,
  payload: {
    index
  }
});
export const squareKeyDown = (index: number, key: string, shiftKey: boolean) : Actions.SquareKeyDown => ({
  type: Type.SYNC,
  action: ActionNames.SQUARE_KEYDOWN,
  payload: {
    index, key, shiftKey
  }
});



