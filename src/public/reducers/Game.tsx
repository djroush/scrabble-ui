import { AppState } from '../store/State';

export const updateName = (appState: AppState, newName: string) => {
  let {name, ...others} = {...appState.input}
  name = newName.toUpperCase();
  appState.input = {name, ...others};
  return appState;
}

export const updateGameId = (appState: AppState, newGameId: string) => {
  let {gameId, ...others} = {...appState.input}
  gameId = newGameId.toUpperCase();
  appState.input = {gameId, ...others};
  return appState;
}
