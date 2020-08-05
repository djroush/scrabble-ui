import { AppState, RequestStatus, GameStatus, ErrorState } from '../store/State';
import {GameResponseSuccess} from '../store/Service'
import {getNewBoard} from '../reducers/Board'

export const createGameRequest = (appState: AppState) => {
  let {status, data, error, ...others} = {...appState.service.gamePending};
  status = RequestStatus.REQUESTING;
  data = null;
  error = null;
  appState.service.gamePending = {status, data, error, ...others};  
  return appState;
}

export const createGameSuccess = (appState: AppState, data1: GameResponseSuccess) => {
  let {status, data, error, ...others} = {...appState.service.gamePending};
  status = RequestStatus.SUCCESSFUL;
  data = data1;
  error = null;
  
  appState.board = getNewBoard();
  appState.service.gamePending = {status, data, error, ...others};

  
  appState.players.info = data1.players.map(player => {
    const {name, score} = player
    return {name, score};
  });

  //TODO: updatestate
  appState.game.gameId = data1.id;
  //appState.players = data1.players; //todo transform here as needed
  appState.game.status = GameStatus.ACTIVE;  //This hsould be pending;
    
  return appState;
}

export const createGameFailure = (appState: AppState, error1: ErrorState) => {
  let {status, data, error, ...others} = {...appState.service.gamePending};
  status = RequestStatus.ERRORED;
  data = null;
  error = error1;
  appState.service.gamePending = {status, data, error, ...others};  
  return appState;
}