import { AppState, RequestStatus, ErrorState,SquareState } from '../store/State';
import {GameResponseSuccess} from '../store/Service'
import {getNewBoard} from '../reducers/Board'
import * as GameStatusHelper from '../helper/GameStatusHelper'

export const gameUnknownRequest = (appState: AppState) => {
  let {status, error, ...others} = {...appState.service.gameState};
  status = RequestStatus.REQUESTING;
  error = null;
  appState.service.gameState = {status, error, ...others};  
  return appState;
}

export const gameUnknownSuccess = (appState: AppState, data: GameResponseSuccess) => {
  let {status, error, ...others} = {...appState.service.gameState};
  status = RequestStatus.SUCCESSFUL;
  error = null;
  appState.service.gameState = {status, error, ...others};
  //make a common method to handle all updates
     
  if (data) {
    appState.board = getNewBoard();  
  }
  //TODO: set game.playerIndex
  
  return parseGameResponse(appState, data);
}

export const gameUnknownFailure = (appState: AppState, error1: ErrorState) => {
  let {status, error, ...others} = {...appState.service.gameState};
  status = RequestStatus.ERRORED;
  error = error1;
  appState.service.gameState = {status, error, ...others};  
  return appState;
}

export const gamePendingRequest = (appState: AppState) => {
  let {status, error, ...others} = {...appState.service.gameState};
  status = RequestStatus.REQUESTING;
  error = null;
  appState.service.gameState = {status, error, ...others};  
  return appState;
}

export const gamePendingSuccess = (appState: AppState, data: GameResponseSuccess, eTag?: string) => {
  let {status, error, ...others} = {...appState.service.gameState};
  status = RequestStatus.SUCCESSFUL;
  error = null;
  appState.service.gameState = {status, error, ...others};

  if (data) {
    appState.board = getNewBoard();  
  }
  if (eTag && eTag === appState.game.version) {
    return appState;
  } else {
    return parseGameResponse(appState, data);  
  }   
}

export const gamePendingFailure = (appState: AppState, error1: ErrorState) => {
  let {status, error, ...others} = {...appState.service.gameState};
  status = RequestStatus.ERRORED;
  error = error1;
  appState.service.gameState = {status, error, ...others};  
  return appState;
}


export const gameRefreshRequest = (appState: AppState) => {
  let {status, error, ...others} = {...appState.service.gameRefresh};
  status = RequestStatus.REQUESTING;
  error = null;
  appState.service.gameRefresh = {status, error, ...others};  
  return appState;
}

export const gameRefreshSuccess = (appState: AppState, data: GameResponseSuccess, eTag?: string) => {
  let {status, error, ...others} = {...appState.service.gameRefresh};
  status = RequestStatus.SUCCESSFUL;
  error = null;
  appState.service.gameRefresh = {status, error, ...others};

   const noActiveRequests: boolean = 
     appState.service.gameState.status !== RequestStatus.REQUESTING; 

  if ((eTag && eTag === appState.game.version) || !data || !noActiveRequests) {
    return appState;
  } else {
    return parseGameResponse(appState, data);  
  }   
}

export const gameRefreshFailure = (appState: AppState, error1: ErrorState) => {
  let {status, error, ...others} = {...appState.service.gameRefresh};
  status = RequestStatus.ERRORED;
  error = error1;
  appState.service.gameRefresh = {status, error, ...others};  
  return appState;
}

export const gameActiveRequest = (appState: AppState) => {
  let {status, error, ...others} = {...appState.service.gameState};
  status = RequestStatus.REQUESTING;
  error = null;
  appState.service.gameState = {status, error, ...others};  
  return appState;
}

export const gameActiveSuccess = (appState: AppState, data: GameResponseSuccess, eTag?: string) => {
  let {status, error, ...others} = {...appState.service.gameState};
  status = RequestStatus.SUCCESSFUL;
  error = null;
  appState.service.gameState = {status, error, ...others};

  if (eTag && eTag === appState.game.version || !data) {
    return appState;
  } else {
    return parseGameResponse(appState, data);  
  }   
}

export const gameActiveFailure = (appState: AppState, error1: ErrorState) => {
  let {status, error, ...others} = {...appState.service.gameState};
  status = RequestStatus.ERRORED;
  error = error1;
  appState.service.gameState = {status, error, ...others};  
  return appState;
}

const parseGameResponse = (appState: AppState, data: GameResponseSuccess) => {
  
  const id: string = data.game.id.toString()
  const playerId: string = data.game.playerId.toString();
  const playerIndex: number = data.players.findIndex(player => player.id === playerId);
  const version: string = data.game.version.toString();
  const activePlayerIndex: number  = data.game.activePlayerIndex;
  const status = GameStatusHelper.getStatus(data.game.state);
  const isPlayerUp = playerIndex === activePlayerIndex
  appState.game = {version,id,playerId,playerIndex,activePlayerIndex,isPlayerUp,status};

  let {tiles, ...othersRack} = appState.rack;
  tiles = data.rack.tiles.map(letter => {
    return {
      letter: letter,
      isBlank: ' ' === letter
    }
  });
  appState.rack = {tiles, ...othersRack}
 
  appState.turn = {playedTiles: []}
  appState.exchange = { tiles: []}
 
  appState.players = data.players
  
  appState.lastTurn = data.lastTurn;
    
  let {squares, ...others2} = appState.board  
  
  const updatedSquares: SquareState[] = [];
  data.board.squares.forEach(square => {
    const index = square.row*15+square.col
    const existingSquare = squares && squares[index]
    const tile = square.tile || {letter: null, isBlank: null}
    const updatedSquare: SquareState = {
      tile: tile,
      modifier: existingSquare.modifier,
      direction: existingSquare.direction,
    }
    updatedSquares.push(updatedSquare);
  });
  squares = updatedSquares;
  appState.board = { squares, ...others2}

  return appState;
}