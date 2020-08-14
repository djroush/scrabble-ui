import { AppState, RequestStatus, GameStatus, ErrorState } from '../store/State';
import { Player } from '../store/Service';
import {GameResponseSuccess} from '../store/Service'
import {getNewBoard} from '../reducers/Board'
import * as GameStatusHelper from '../helper/GameStatusHelper'

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
  appState.game.version = data.version

  
  appState.players.info = data1.players.map(player => {
    const {id, name, score} = player
    return {id, name, score};
  });

  //TODO: updatestate
  appState.game.id = data1.id;
  appState.game.playerId = data1.playerId
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

export const gamePendingSuccess = (appState: AppState, data1: GameResponseSuccess, eTag?: string) => {
  let {status, data, error, ...others} = {...appState.service.gamePending};
  status = RequestStatus.SUCCESSFUL;
  data = !!data1 ? data1 : data;
  error = null;
  appState.service.gamePending = {status, data, error, ...others};

  if (data) {
    //TODO: check status here
    appState.board = getNewBoard();
  
    //Take the rack from the only player with letters  
    appState.rack.letters =  data1.players
      .filter(player => player.rack && player.rack.tiles)
      .map(player => player.rack.tiles)
      .find(_ => true);
     
      //players":[{"id":"1","name":"BILLY","rack":{"tiles":[]},"score":0,"skipTurnCount":0,"isForfeited":false} 
    appState.players.info = data.players.map((player: Player) => {
          const {id, name, score} = player;
          return {id, name, score};
    })
    appState.game.status = GameStatusHelper.getStatus(data.state);
    let {version, ...others} = appState.game
    version = !isNaN(parseInt(eTag)) ? eTag : version
    appState.game = {version, ...others}
  }
    
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