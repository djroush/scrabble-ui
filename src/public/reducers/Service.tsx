import { AppState, RequestStatus, GameStatus, ErrorState,SquareState, StorageState } from '../types/State';
import {GameResponseSuccess} from '../types/Service'

export const gameUnknownRequest = (appState: AppState) => {
  let {status, error, ...others} = {...appState.service.gameState};
  status = RequestStatus.REQUESTING;
  error = null;
  appState.service.gameState = {status, error, ...others};  
  return appState;
}

export const gameUnknownSuccess = (appState: AppState, data: GameResponseSuccess) => {
  let {status, error, ...others} = {...appState.service.gameState};
  status = RequestStatus.SUCCESSFUL;
  error = null;
  appState.service.gameState = {status, error, ...others};
     
  return parseGameResponse(appState, data);
}

export const gameUnknownFailure = (appState: AppState, error1: ErrorState) => {
  let {status, error, ...others} = {...appState.service.gameState};
  status = RequestStatus.ERRORED;
  error = error1;
  appState.service.gameState = {status, error, ...others};  
  return appState;
}

export const gamePendingRequest = (appState: AppState) => {
  let {status, error, ...others} = {...appState.service.gameState};
  status = RequestStatus.REQUESTING;
  error = null;
  appState.service.gameState = {status, error, ...others};  
  return appState;
}

export const gamePendingSuccess = (appState: AppState, data: GameResponseSuccess, eTag?: string) => {
  let {status, error, ...others} = {...appState.service.gameState};
  status = RequestStatus.SUCCESSFUL;
  error = null;
  appState.service.gameState = {status, error, ...others};

  if (eTag && eTag === appState.game.version) {
    return appState;
  } else {
    return parseGameResponse(appState, data);  
  }   
}

export const gamePendingFailure = (appState: AppState, error1: ErrorState) => {
  let {status, error, ...others} = {...appState.service.gameState};
  status = RequestStatus.ERRORED;
  error = error1;
  appState.service.gameState = {status, error, ...others};  
  return appState;
}


export const gameRefreshRequest = (appState: AppState) => {
  let {status, error, ...others} = {...appState.service.gameRefresh};
  status = RequestStatus.REQUESTING;
  error = null;
  appState.service.gameRefresh = {status, error, ...others};  
  return appState;
}

export const gameRefreshSuccess = (appState: AppState, data: GameResponseSuccess, eTag?: string) => {
  let {status, error, ...others} = {...appState.service.gameRefresh};
  status = RequestStatus.SUCCESSFUL;
  error = null;
  appState.service.gameRefresh = {status, error, ...others};

   //FIXME: this is probably not needed
   //const noActiveRequests: boolean = 
   //  appState.service.gameState.status !== RequestStatus.REQUESTING; 

  if ((eTag && eTag === appState.game.version) || !data /*|| !noActiveRequests*/) {
    return appState;
  } else {
    return parseGameResponse(appState, data);  
  }   
}

export const gameRefreshFailure = (appState: AppState, error1: ErrorState) => {
  let {status, error, ...others} = {...appState.service.gameRefresh};
  status = RequestStatus.ERRORED;
  error = error1;
  appState.service.gameRefresh = {status, error, ...others};  
  return appState;
}

export const gameActiveRequest = (appState: AppState) => {
  let {status, error, ...others} = {...appState.service.gameState};
  status = RequestStatus.REQUESTING;
  error = null;
  appState.service.gameState = {status, error, ...others};  
  return appState;
}

export const gameActiveSuccess = (appState: AppState, data: GameResponseSuccess, eTag?: string) => {
  let {status, error, ...others} = {...appState.service.gameState};
  status = RequestStatus.SUCCESSFUL;
  error = null;
  appState.service.gameState = {status, error, ...others};

  if (eTag && eTag === appState.game.version || !data) {
    return appState;
  } else {
    return parseGameResponse(appState, data);  
  }   
}

export const gameActiveFailure = (appState: AppState, error1: ErrorState) => {
  let {status, error, ...others} = {...appState.service.gameState};
  status = RequestStatus.ERRORED;
  error = error1;
  appState.service.gameState = {status, error, ...others};  
  return appState;
}

const parseGameResponse = (appState: AppState, data: GameResponseSuccess) => {
  const id: string = data.game.id.toString()
  const playerId: string = data.game.playerId.toString();
  const playerIndex: number = data.game.playerIndex;
  const version: string = data.game.version.toString();
  const activePlayerIndex: number  = data.game.activePlayerIndex;
  const status: GameStatus = getGameStatus(data.game.state);
  const isPlayerUp = playerIndex === activePlayerIndex
  const wasPlayerUp: boolean = data.game.lastPlayerToPlayTilesIndex === playerIndex || false
  const canChallenge: boolean = data.game.canChallenge && !wasPlayerUp
  
  const storageState: StorageState = {gameId: id, playerId}

  if (status === GameStatus.ABORTED || status === GameStatus.FINISHED || status === GameStatus.ABANDONED) {
    sessionStorage.removeItem('gameState');
  } else {
    sessionStorage.setItem('gameState', JSON.stringify(storageState));
  }
  
  appState.game = {version,id,playerId,playerIndex,activePlayerIndex,isPlayerUp, canChallenge, status};

  let {tiles, ...othersRack} = appState.rack;
  tiles = data.rack.tiles.map(letter => {
    return {
      letter: letter,
      blank: ' ' === letter
    }
  });
  appState.rack = {tiles, ...othersRack}
  
  appState.turn = {playedTiles: []}
  appState.exchange = { tiles: []}
  appState.players = data.players
  appState.lastTurn = { ...data.lastTurn, enactChallenge: null }
    
  let {squares, ...others2} = appState.board  
  const updatedSquares: SquareState[] = [];
  
  let index = 0;
  
  const needsModifiers: boolean = !(squares && squares[0] && squares[0].modifier)
  
  data.board.squares.forEach(square => {
    const existingSquare = squares && squares[index]
    const tile = square  || {letter: null, blank: null}
    const modifier = needsModifiers ? getScoreModifier(index) : existingSquare && existingSquare.modifier
    const direction = existingSquare && existingSquare.direction  
    const updatedSquare: SquareState = {
      tile, modifier, direction
    }
    updatedSquares.push(updatedSquare);
    index += 1;
  });
  squares = updatedSquares;
  appState.board = { squares, ...others2}

  return appState;
}

 const getGameStatus = (status: string): GameStatus => {
  switch(status) {
    case 'PENDING': {
      return GameStatus.PENDING;
    }
    case 'ABANDONED': {
      return GameStatus.ABANDONED;
    }
    case 'ACTIVE': {
      return GameStatus.ACTIVE;
    }
    case 'ENDGAME': {
      return GameStatus.ENDGAME;
    }
    case 'FINISHED': {
      return GameStatus.FINISHED;
    }
    case 'ABORTED': {
      return GameStatus.ABORTED;
    }
  }
  return GameStatus.UNKNOWN;
}


const getScoreModifier = (index: number): string => {
  const row = Math.floor(index / 15);
  const col = index % 15;

  if (row == 7 && col == 7) {
    return 'center2';
  } else if ((row % 7 == 0 && col % 8 ==  3) ||
    (row %  8 == 3 &&  col % 7 ==  0) ||
    (row % 10 == 2 && (col == 6 || col == 8)) ||
    (row % 10 == 2 && (col == 6 || col == 8)) ||
    ((row == 6 || row == 8) && (col % 10 == 2 || col == 6 || col == 8))
     ) {
    return 'letter2';
  } else if (row % 4 == 1 && col % 4 == 1 && !(row % 12 == 1 && col % 12 == 1)) {
    return 'letter3';
  } else if ((row == col || row + col == 14) &&
          ((row >= 1 && row <= 4) || (row >= 10 && row <= 13)))  {
    return 'word2';
    //The center tile is handled above by DOUBLE_WORD
  } else if (row % 7 == 0 && col % 7 == 0) {
    return 'word3';
  }
  return '';
};
