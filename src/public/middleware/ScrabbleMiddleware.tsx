import {Store} from 'redux'

import { AppAction, Type } from '../actions/Actions'; 
import * as ActionNames from '../actions/ActionNames';
import * as AsyncActionCreator from '../actions/AsyncActionCreator';
import * as ActionCreator from '../actions/ActionCreator';
import {AppState, RequestStatus} from '../store/State';

const scrabbleMiddleware: any =  (store: Store<AppState, AppAction>) => (next: (action: AppAction) => void) => (action: AppAction)  => {

  const createGame = (): void => {
    if (appState.service.gameState.status !== RequestStatus.REQUESTING) {
      next(AsyncActionCreator.gameUnknownRequest())
  
      const player = {
        name: appState.input.name
      }
      fetch('http://localhost:8080/scrabble/game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(player)
      }).then((response) => {
        return response.json();
      }).then((data) => {
        //FIXME: data.status == null
        if (data.status >= 400) {
          throw new Error(data.message)
        }
        return data
      }).then((data) => {
        next(AsyncActionCreator.gameUnknownSuccess(data));
      }).catch((error) => {
        next(AsyncActionCreator.gameUnknownFailure(error));
      });
    }
  }    
   
  const joinGame = (): void => {
    if (appState.service.gameState.status !== RequestStatus.REQUESTING) {
      next(AsyncActionCreator.gameUnknownRequest())
      
      const player = {
        name: appState.input.name
      }
      
      fetch('http://localhost:8080/scrabble/game/' + gameId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(player)
      }).then((response) => {
        return response.json();
      }).then((data) => {
        if (data.status >= 400) {
          throw new Error(data.message)
        }
        return data
      }).then((data) => {
        next(AsyncActionCreator.gameUnknownSuccess(data));
      }).catch((error) => {
        next(AsyncActionCreator.gameUnknownFailure(error));
      });
    }
  }    
  
  const leaveGame = (): void => {
    if (appState.service.gameState.status !== RequestStatus.REQUESTING) {
      next(AsyncActionCreator.gamePendingRequest())
      fetch('http://localhost:8080/scrabble/game/' + id + "/" + playerId, {
        method: 'DELETE',
      }).then((response) => {
        return response.json();
      }).then((data) => {
        if (data.status >= 400) {
          throw new Error(data.message)
        }
        return data
      }).then(() => {
        next(ActionCreator.newGame());
      }).catch((error) => {
        next(AsyncActionCreator.gamePendingFailure(error));
      });
    }
  }

  const startGame = (): void => {
    if (appState.service.gameState.status !== RequestStatus.REQUESTING) {
      next(AsyncActionCreator.gamePendingRequest())
      fetch('http://localhost:8080/scrabble/game/' + id + "/" + playerId + "/start", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        return response.json();
      }).then((data) => {
        if (data.status >= 400) {
          throw new Error(data.message)
        }
        return data
      }).then((data) => {
        next(AsyncActionCreator.gamePendingSuccess(data));
      }).catch((error) => {
        next(AsyncActionCreator.gamePendingFailure(error));
      });
    }
  }

  const playTiles = (): void => {
    if (appState.service.gameState.status !== RequestStatus.REQUESTING) {
      next(AsyncActionCreator.gameActiveRequest())
      const turn = appState.turn
      const squares = turn.playedTiles.map(playedTile => {
        return {
          row: Math.floor(playedTile.index / 15),
          col: playedTile.index % 15,
          tile: playedTile.tile
        }
      });
      
      fetch('http://localhost:8080/scrabble/game/' + id + "/" + playerId + '/play', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({squares})
      }).then((response) => {
        return response.json();
      }).then((data) => {
        if (data.status >= 400) {
          throw new Error(data.message)
        }
        return data
      }).then((data) => {
        next(AsyncActionCreator.gameActiveSuccess(data));
      }).catch((error) => {
        next(AsyncActionCreator.gameActiveFailure(error));
        //TODO: on error, reset played tiles back to rack?
      });
    }
  }
  
  const exchangeTiles = (): void => {
    if (appState.service.gameState.status !== RequestStatus.REQUESTING) {
      next(AsyncActionCreator.gameActiveRequest())
      const tiles = appState.exchange.tiles
      
      fetch('http://localhost:8080/scrabble/game/' + id + "/" + playerId + '/exchange', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({tiles})
      }).then((response) => {
        return response.json();
      }).then((data) => {
        if (data.status >= 400) {
          throw new Error(data.message)
        }
        return data
      }).then((data) => {
        next(AsyncActionCreator.gameActiveSuccess(data));
      }).catch((error) => {
        next(AsyncActionCreator.gameActiveFailure(error));
        //TODO: on error, reset played tils back to rack?
      });
    }
  }

  const passTurn = (): void => {
    if (appState.service.gameState.status !== RequestStatus.REQUESTING) {
      
      fetch('http://localhost:8080/scrabble/game/' + id + "/" + playerId + '/pass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        return response.json();
      }).then((data) => {
        if (data.status >= 400) {
          throw new Error(data.message)
        }
        return data
      }).then((data) => {
        next(AsyncActionCreator.gameActiveSuccess(data));
      }).catch((error) => {
        next(AsyncActionCreator.gameActiveFailure(error));
      });
    }
  }

  const challengeTurn = (): void => {
    if (appState.service.gameState.status !== RequestStatus.REQUESTING) {
      
      fetch('http://localhost:8080/scrabble/game/' + id + "/" + playerId + '/challenge', {
        method: 'POST',
      }).then((response) => {
        return response.json();
      }).then((data) => {
        if (data.status >= 400) {
          throw new Error(data.message)
        }
        return data
      }).then((data) => {
        next(AsyncActionCreator.gameActiveSuccess(data));
      }).catch((error) => {
        next(AsyncActionCreator.gameActiveFailure(error));
      });
    }
  }

  const forfeitGame = (): void => {
    if (appState.service.gameState.status !== RequestStatus.REQUESTING) {
      next(AsyncActionCreator.gameActiveRequest())

      fetch('http://localhost:8080/scrabble/game/' + id + "/" + playerId + '/forfeit', {
        method: 'POST',
      }).then((response) => {
        return response.json();
      }).then((data) => {
        if (data.status >= 400) {
          throw new Error(data.message)
        }
        return data
      }).then(() => {
        next(ActionCreator.newGame());
      }).catch((error) => {
        next(AsyncActionCreator.gameActiveFailure(error));
      });
    }
  }

  if (action.type === Type.SYNC) {
    return next(action);
  }
  
  const appState: AppState = store.getState();
  const {playerId,id} = appState.game;
  const {name, gameId} = appState.input;
  const queryString = "?player=" + name     //TODO: encode input for playerName?
  
  switch (action.action) {
    case ActionNames.INPUT_KEYDOWN: {
      const inputKeyDownAction = action.payload;
      const {isCreate,key} = inputKeyDownAction;
      if (key === 'Enter') {
        if (isCreate && !!name && name.length > 0) {
          createGame();
        } else if (!!gameId && gameId.length > 0 && !!name && name.length > 0) {
          joinGame();
        } else {
          //Put a user error mentioning validation error here
        }
      }
      
      break;
    }
    case ActionNames.CREATE_GAME: {
      createGame();
      break;
    }
    case ActionNames.JOIN_GAME: {
      joinGame();
      break;
    }
    case ActionNames.START_GAME: {
      startGame();
      break;
    }
    case ActionNames.PLAY_TILES: {
      playTiles();
      break;
    }
    case ActionNames.EXCHANGE_TILES: {
      exchangeTiles();
      break;
    }
    case ActionNames.PASS_TURN: {
      passTurn();
      break;
    }
    case ActionNames.CHALLENGE_TURN: {
      challengeTurn();
      break;
    }
    case ActionNames.LEAVE_GAME: {
      leaveGame();
      break;
    }
    case ActionNames.FORFEIT_GAME: {
      forfeitGame();
      break;
    }
  }
};

export default scrabbleMiddleware;