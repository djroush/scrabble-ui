import { AppState } from '../store/State';

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
