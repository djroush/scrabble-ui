import { AppState } from '../store/State';

import { getNewBoard } from '../reducers/Board'

export const inputKeyDown = (appState: AppState, key: string, isCreate: boolean) => {
  const {gameId, name} = {...appState.game.pending};
  if (key === 'Enter') {
    if (isCreate) {
      return createGame(appState);
    } else if (!!gameId && gameId.length > 0 && !!name && name.length > 0) {
      return joinGame(appState);
    }
  }  
  return appState;
}



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

//FIXME: update this one integrated with the service
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
  
  appState.board = getNewBoard();
  
  return appState;
}

export const createGame = (appState: AppState) => {
  let {status, gameId, ...others} = {...appState.game}
  status = "ACTIVE";
  gameId = "GAME1"; 
  appState.game = {status, gameId, ...others}; 
  
  let {name, ...others2} =  {...appState.players.info[0]};
  name = appState.game.pending.name;
  appState.players.info[0] = {name, ...others2};
  
  appState.board = getNewBoard();
  
  return appState;
}