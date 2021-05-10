import {Store} from 'redux'

import { AppAction, Type } from '../actions'; 
import * as SyncActionNames from '../actions/SyncActionNames';
import * as SseActionCreator from '../actions/SseActionCreator';
import * as AsyncActionCreator from '../actions/AsyncActionCreator';
import * as ActionCreator from '../actions/SyncActionCreator';
import {AppState, RequestStatus, StorageState} from '../types/State';
import { GameResponseSuccess } from 'types/Service';
import { SseGameInfo } from 'actions/SseActions';

const scrabbleMiddleware: any = (store: Store<AppState, AppAction>) => (next: (action: AppAction) => void) => (action: AppAction)  => {

  const scrabbleServiceEndpoint = 'http://localhost:8080/v2/scrabble/game/';

  const refreshGame = (): void => { 
    let eTag = '';

    const storageState: StorageState = JSON.parse(sessionStorage.getItem('gameState'))?.game
    const {id,playerId} = {...storageState}
    if (playerId && id) {
        const version = "0";

        next(AsyncActionCreator.gameRefreshRequest())
        fetch(scrabbleServiceEndpoint + id + "/" + playerId , {
          method: 'GET',
          headers: {
            'ETag': version
          },
        }).then((response) => {
          eTag = response.headers.get('ETag');
          if (response.status < 300 || response.status >= 400) {
            return response.json()
          } else {
            next(AsyncActionCreator.gameRefreshSuccess(null, eTag));
          }
        }).then((data) => {
            if (!!data && data.status >= 400) {
              throw new Error(data.message)
            }
            if (data) {
              const {id, playerId} = data.game
              const gameInfo: SseGameInfo = {gameId:id, playerId}
              next(SseActionCreator.gameAttachAction(gameInfo))
              next(AsyncActionCreator.gameRefreshSuccess(data, eTag));
            }
        }).catch((error) => {
          next(AsyncActionCreator.gameRefreshFailure(error));
        });
     }
  }


  const createGame = (): void => {
    if (appState.service.gameState.status !== RequestStatus.REQUESTING) {
      next(AsyncActionCreator.gameUnknownRequest())
  
      const player = {
        name: appState.input.name
      }
      fetch(scrabbleServiceEndpoint, {
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
      }).then((data: GameResponseSuccess) => {
        const {id:gameId, playerId} = data.game
        const gameInfo = {gameId, playerId}
        next(SseActionCreator.gameAttachAction(gameInfo))
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
      
      fetch(scrabbleServiceEndpoint + gameId, {
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
      }).then((data: GameResponseSuccess) => {
        const {id:gameId, playerId, playerIndex} = data.game
        const gameInfo = {gameId, playerId, playerIndex}
        next(SseActionCreator.gameAttachAction(gameInfo))
        next(AsyncActionCreator.gameUnknownSuccess(data));
  }).catch((error) => {
        next(AsyncActionCreator.gameUnknownFailure(error));
      });
    }
  }    
  
  const leaveGame = (): void => {
    if (appState.service.gameState.status !== RequestStatus.REQUESTING) {
      next(AsyncActionCreator.gamePendingRequest())
      fetch(scrabbleServiceEndpoint + id + "/" + playerId, {
        method: 'DELETE',
      }).then((response) => {
        return response.json();
      }).then((data) => {
        if (data.status >= 400) {
          throw new Error(data.message)
        }
        return data
      }).then((data) => {
        next(SseActionCreator.gameDetachAction())
        next(ActionCreator.newGame());
      }).catch((error) => {
        next(AsyncActionCreator.gamePendingFailure(error));
      });
    }
  }

  const startGame = (): void => {
    if (appState.service.gameState.status !== RequestStatus.REQUESTING) {
      next(AsyncActionCreator.gamePendingRequest())
      fetch(scrabbleServiceEndpoint + id + "/" + playerId + "/start", {
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
      
      fetch(scrabbleServiceEndpoint + id + "/" + playerId + '/play', {
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
      
      fetch(scrabbleServiceEndpoint + id + "/" + playerId + '/exchange', {
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
      
      fetch(scrabbleServiceEndpoint + id + "/" + playerId + '/pass', {
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

  const challengeTurn = (challenge: boolean): void => {
    if (appState.service.gameState.status !== RequestStatus.REQUESTING) {
      
      var challengeRequest = {
        challengeTurn: challenge,
        version : appState.game.version,        
      }
      
      fetch(scrabbleServiceEndpoint + id + "/" + playerId + '/challenge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(challengeRequest)
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

      fetch(scrabbleServiceEndpoint + id + "/" + playerId + '/forfeit', {
        method: 'POST',
      }).then((response) => {
        return response.json();
      }).then((data) => {
        if (data.status >= 400) {
          throw new Error(data.message)
        }
        return data
      }).then((data) => {
        next(ActionCreator.newGame());
        next(SseActionCreator.gameDetachAction())
      }).catch((error) => {
        next(AsyncActionCreator.gameActiveFailure(error));
      });
    }
  }

  if (action.type !== Type.ASYNC) {
    return next(action);
  }
  
  const appState: AppState = store.getState();
  const {playerId,id} = appState.game;
  const {name, gameId} = appState.input;
  
  switch (action.action) {
    case SyncActionNames.INPUT_KEYDOWN: {
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
    case SyncActionNames.CREATE_GAME: {
      createGame();
      break;
    }
    case SyncActionNames.JOIN_GAME: {
      joinGame();
      break;
    }
    case SyncActionNames.START_GAME: {
      startGame();
      break;
    }
    case SyncActionNames.PLAY_TILES: {
      playTiles();
      break;
    }
    case SyncActionNames.EXCHANGE_TILES: {
      exchangeTiles();
      break;
    }
    case SyncActionNames.PASS_TURN: {
      passTurn();
      break;
    }
    case SyncActionNames.CHALLENGE_TURN: {
      const challengeTurnAction = action.payload;
      const {challenge} = challengeTurnAction;

      challengeTurn(challenge);
      break;
    }
    case SyncActionNames.LEAVE_GAME: {
      leaveGame();
      break;
    }
    case SyncActionNames.FORFEIT_GAME: {
      forfeitGame();
      break;
    }
    case SyncActionNames.REFRESH_GAME: {
      refreshGame();
      break;
    }
  }
};

export default scrabbleMiddleware;