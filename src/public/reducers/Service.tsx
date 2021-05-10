import { AppState, RequestStatus, GameStatus, ErrorState,SquareState, StorageState, GameState, Tile } from '../types/State';
import {Game, GameResponseSuccess, Player} from '../types/Service'


export const gameUnknownRequest = (appState: AppState) => {
  let {status, error, ...others} = {...appState.service.gameState};
  status = RequestStatus.REQUESTING;
  error = null;
  appState.service.gameState = {status, error, ...others};  
  return appState;
}

export const gameUnknownSuccess = (appState: AppState, data: GameResponseSuccess) => {
  const {status, error, ...others} = {...appState.service.gameState};
  appState.service.gameState = {
    status: RequestStatus.SUCCESSFUL,
    error: null,
     ...others
  };
  
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

export const gamePendingSuccess = (appState: AppState) => {
  let {status, error, ...others} = {...appState.service.gameState};
  status = RequestStatus.SUCCESSFUL;
  error = null;
  appState.service.gameState = {status, error, ...others};

  return appState;
}

export const gamePendingFailure = (appState: AppState, error1: ErrorState) => {
  let {status, error, ...others} = {...appState.service.gameState};
  status = RequestStatus.ERRORED;
  error = error1;
  appState.service.gameState = {status, error, ...others};  
  return appState;
}

export const gameActiveRequest = (appState: AppState) => {
  let {status, error, ...others} = {...appState.service.gameState};
  status = RequestStatus.REQUESTING;
  error = null;
  appState.service.gameState = {status, error, ...others};  
  return appState;
}

export const gameActiveSuccess = (appState: AppState) => {
  let {status, error, ...others} = {...appState.service.gameState};
  status = RequestStatus.SUCCESSFUL;
  error = null;
  appState.service.gameState = {status, error, ...others};
  // let { version, status, ...others2 } = {...appState.game}

  // appStateState.game = {version, status, ...others2}
  return appState;
}

export const gameActiveFailure = (appState: AppState, error1: ErrorState) => {
  let {status, error, ...others} = {...appState.service.gameState};
  status = RequestStatus.ERRORED;
  error = error1;
  appState.service.gameState = {status, error, ...others};  
  return appState;
}


export const gameRefreshRequest = (appState: AppState) => {
    let {status, error, ...others} = {...appState.service.gameState};
    status = RequestStatus.REQUESTING;
    error = null;
    appState.service.gameState = {status, error, ...others};
    return appState;
  }
  
  export const gameRefreshSuccess = (appState: AppState, data: GameResponseSuccess, eTag?: string) => {
    let {status, error, ...others} = {...appState.service.gameState};
    status = RequestStatus.SUCCESSFUL;
    error = null;
    appState.service.gameState = {status, error, ...others};
    
    if ((eTag && eTag === appState.game.version) || !data) {
      return appState;
    } else {
      return parseGameResponse(appState, data);
    }
  }
  
  export const gameRefreshFailure = (appState: AppState, error1: ErrorState) : AppState => {
    let {status, error, ...others} = {...appState.service.gameState};
    status = RequestStatus.ERRORED;
    error = error1;
    appState.service.gameState = {status, error, ...others};
    return appState;
  }

const shuffle = (tiles: Tile[]) => {
  let shuffledTiles: Tile[] = [];
  
  while (tiles.length > 0) {
    const index: number = Math.floor(Math.random() * tiles.length);
    const tile: Tile = tiles.splice(index, 1)[0];
    shuffledTiles.push(tile);
  }
  return shuffledTiles; 
}

const parseGameResponse = (appState: AppState, data: GameResponseSuccess) : AppState => {
  appState.game = parseGame(data.game, data.players)

  let {tiles, sortedTiles} = appState.rack;
  tiles = (data.rack?.tiles || []).map(letter => {
    return {
      letter, blank: ' ' === letter
    }
  });
  if (!tilesAreSame(tiles, sortedTiles)) {
    sortedTiles = [...tiles]
    tiles = shuffle(tiles)
    appState.rack = {tiles, sortedTiles}
  }
  appState.turn = {playedTiles: []}
  appState.exchange = { tiles: []}
  appState.players = data.players
  appState.lastTurn = { ...data.lastTurn, enactChallenge: null }
    
  let {squares, ...others} = appState.board  
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
  appState.board = { squares, ...others}

  const state = data?.game?.state
  if (state === "ABORTED" || state === "FINISHED" || state === "ABANDONED") {
     sessionStorage.removeItem('gameState');
  } else {
     sessionStorage.setItem('gameState', JSON.stringify(data));
  }

  return appState;
}

const parseGame = (game: Game, players: Player[]): GameState => {
  const {id, playerId, version, playerIndex, activePlayerIndex, winningPlayerIndex} = game
  const status: GameStatus = getGameStatus(game.state);
  const isPlayerUp = playerIndex === activePlayerIndex
  const canChallenge: boolean = !(game.lastPlayerToPlayTilesIndex === playerIndex || false)
  const gameState: GameState = {version,id,playerId,playerIndex,activePlayerIndex,isPlayerUp, canChallenge, winningPlayerIndex, status};
  
  return gameState
}

const tilesAreSame = (existing: Tile[], newer: Tile[]) : boolean => {
  return existing === newer || 
    (existing?.length === newer?.length && existing?.every(function(value, index) {
    return value.letter === newer[index].letter;
  }));
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
