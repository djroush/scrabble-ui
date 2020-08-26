import { AppState, RequestStatus, ErrorState,SquareState } from '../store/State';
import {GameResponseSuccess} from '../store/Service'
import {getNewBoard} from '../reducers/Board'
import * as GameStatusHelper from '../helper/GameStatusHelper'

export const gameUnknownRequest = (appState: AppState) => {
  let {status, error, ...others} = {...appState.service.gameUnknown};
  status = RequestStatus.REQUESTING;
  error = null;
  appState.service.gameUnknown = {status, error, ...others};  
  return appState;
}

export const gameUnknownSuccess = (appState: AppState, data: GameResponseSuccess) => {
  let {status, error, ...others} = {...appState.service.gameUnknown};
  status = RequestStatus.SUCCESSFUL;
  error = null;
  appState.service.gameUnknown = {status, error, ...others};
  //make a common method to handle all updates
     
  if (data) {
    appState.board = getNewBoard();  
  }
  
  return parseGameResponse(appState, data);
}

export const gameUnknownFailure = (appState: AppState, error1: ErrorState) => {
  let {status, error, ...others} = {...appState.service.gameUnknown};
  status = RequestStatus.ERRORED;
  error = error1;
  appState.service.gameUnknown = {status, error, ...others};  
  return appState;
}

export const gamePendingRequest = (appState: AppState) => {
  let {status, error, ...others} = {...appState.service.gamePending};
  status = RequestStatus.REQUESTING;
  error = null;
  appState.service.gamePending = {status, error, ...others};  
  return appState;
}

export const gamePendingSuccess = (appState: AppState, data: GameResponseSuccess, eTag?: string) => {
  let {status, error, ...others} = {...appState.service.gamePending};
  status = RequestStatus.SUCCESSFUL;
  error = null;
  appState.service.gamePending = {status, error, ...others};

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
  let {status, error, ...others} = {...appState.service.gamePending};
  status = RequestStatus.ERRORED;
  error = error1;
  appState.service.gamePending = {status, error, ...others};  
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

  //TODO: add call to make next call here
  if (eTag && eTag === appState.game.version || !data) {
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

const parseGameResponse = (appState: AppState, data: GameResponseSuccess) => {
  let {version,id,playerId,status, ...others} = appState.game;
  
  id = data.game.id;
  playerId = data.game.playerId;
  version = data.game.version;
  status = GameStatusHelper.getStatus(data.game.state);
  appState.game = {version,id,playerId,status,...others};

  let {letters, ...others1} = appState.rack;
      //Take the rack from the only player with letters  
//    appState.rack.letters =  data.players
//      .filter(player => player.rack && player.rack.tiles)
//      .map(player => player.rack.tiles)
//      .find(_ => true);
  letters = data.rack.tiles;
  appState.rack = {letters, ...others1}
 
  //players":[{"id":"1","name":"BILLY","rack":{"tiles":[]},"score":0,"skipTurnCount":0,"isForfeited":false} 
  appState.players = data.players
    
    
  let {squares, ...others2} = appState.board
  
  const updatedSquares: SquareState[] = []
  data.board.squares.forEach(square => {
    const index = square.row*15+square.col
    const existingSquare = squares && squares[index]
    const tile = square.tile || {letter: null, isBlank: null}
    const updatedSquare: SquareState = {
      letter: tile.letter,
      isBlank: tile.isBlank,
      modifier: existingSquare.modifier,
      direction: existingSquare.direction,
    }
    updatedSquares.push(updatedSquare);
  });
  squares = updatedSquares;
  appState.board = { squares, ...others2}

  return appState;
  
}