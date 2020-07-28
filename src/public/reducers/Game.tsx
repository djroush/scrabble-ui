import { AppState } from '../store/State';

//FIXME: update this one integrated with the service
export const updateName = (appState: AppState, newName: string) => {
  let {name, ...others} = {...appState.game.pending}
  name = newName.toUpperCase();
  appState.game.pending = {name, ...others};
  return appState;
}

export const updateGameId = (appState: AppState, newGameId: string) => {
  let {gameId, ...others} = {...appState.game.pending}
  gameId = newGameId.toUpperCase();
  appState.game.pending = {gameId, ...others};
  return appState;
}

export const joinGame = (appState: AppState) => {
  let {status, gameId, ...others} = {...appState.game}
  status = "ACTIVE";
  gameId = appState.game.pending.gameId;
  appState.game = { 
    status, gameId, ...others
  }
  
  
  let {name, ...others2} =  {...appState.players.info[0]};
  name = appState.game.pending.name;
  appState.players.info[0] = {name, ...others2}
  
  return appState;
}

export const createGame = (appState: AppState) => {
  let {status, ...others} = {...appState.game}
  status = "ACTIVE";
  appState.game = {status, ...others}; 
  
  let {name, ...others2} =  {...appState.players.info[0]};
  name = appState.game.pending.name;
  appState.players.info[0] = {name, ...others2};
  
  return appState;
}