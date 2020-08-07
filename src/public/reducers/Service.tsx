import { AppState, RequestStatus, GameStatus, ErrorState } from '../store/State';
import {GameResponseSuccess} from '../store/Service'
import {getNewBoard} from '../reducers/Board'

export const gameUnknownRequest = (appState: AppState) => {
  let {status, data, error, ...others} = {...appState.service.gameUnknown};
  status = RequestStatus.REQUESTING;
  data = null;
  error = null;
  appState.service.gameUnknown = {status, data, error, ...others};  
  return appState;
}

export const gameUnknownSuccess = (appState: AppState, data1: GameResponseSuccess) => {
  let {status, data, error, ...others} = {...appState.service.gameUnknown};
  status = RequestStatus.SUCCESSFUL;
  data = data1;
  error = null;
  
  appState.service.gameUnknown = {status, data, error, ...others};

  
  appState.players.info = data1.players.map(player => {
    const {id, name, score} = player
    return {id, name, score};
  });

  //TODO: updatestate
  appState.game.id = data1.id;
  //appState.players = data1.players; //todo transform here as needed
  appState.game.status = GameStatus.PENDING;  //This hsould be pending;
    
  return appState;
}

export const gameUnknownFailure = (appState: AppState, error1: ErrorState) => {
  let {status, data, error, ...others} = {...appState.service.gameUnknown};
  status = RequestStatus.ERRORED;
  data = null;
  error = error1;
  appState.service.gameUnknown = {status, data, error, ...others};  
  return appState;
}


export const gamePendingRequest = (appState: AppState) => {
  let {status, data, error, ...others} = {...appState.service.gamePending};
  status = RequestStatus.REQUESTING;
  data = null;
  error = null;
  appState.service.gamePending = {status, data, error, ...others};  
  return appState;
}

export const gamePendingSuccess = (appState: AppState, data1: GameResponseSuccess) => {
  let {status, data, error, ...others} = {...appState.service.gamePending};
  status = RequestStatus.SUCCESSFUL;
  data = data1;
  error = null;
  
  appState.service.gamePending = {status, data, error, ...others};
  appState.board = getNewBoard();
  
  
  appState.rack.letters =  data1.players
    .filter(player => player.rack && player.rack.tiles)
    .map(player => player.rack.tiles)
    .find(_ => true);
    
    
      
  
  //TODO: updatestate
  appState.game.status = GameStatus.ACTIVE;  //This hsould be pending;
    
  return appState;
}

export const gamePendingFailure = (appState: AppState, error1: ErrorState) => {
  let {status, data, error, ...others} = {...appState.service.gamePending};
  status = RequestStatus.ERRORED;
  data = null;
  error = error1;
  appState.service.gamePending = {status, data, error, ...others};  
  return appState;
}