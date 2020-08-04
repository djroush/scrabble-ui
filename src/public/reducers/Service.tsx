import { AppState, RequestStatus, GameStatus } from '../store/State';
import {GameResponseSuccess} from '../store/Service'

export const createGameRequest = (appState: AppState) => {
  let {status, data, error, ...others} = {...appState.service.createGame};
  status = RequestStatus.REQUESTING;
  data = null;
  error = null;
  appState.service.createGame = {status, data, error, ...others};  
  return appState;
}

export const createGameSuccess = (appState: AppState, data1: GameResponseSuccess) => {
  let {status, data, error, ...others} = {...appState.service.createGame};
  status = RequestStatus.SUCCESSFUL;
  data = data1;
  error = null;
  appState.service.createGame = {status, data, error, ...others};


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

export const createGameFailure = (appState: AppState, error1: unknown) => {
  let {status, data, error, ...others} = {...appState.service.createGame};
  status = RequestStatus.ERRORED;
  error = error1;
  appState.service.createGame = {status, data, error, ...others};  
  return appState;
}
