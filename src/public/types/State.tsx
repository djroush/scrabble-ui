
import {LastTurnActionEnum, LastTurnStateEnum} from '../types/Service'

//TODO: this is a duplicate definition, remove it later
export type Direction = 'horizontal' | 'vertical' | null | ""  
export type Modifier = '' | 'center2' | 'word3' | 'word2' | 'letter3' | 'letter2'; 

export type AppState = {
  input: {
    name : string,
    gameId: string,
  }
  service: ServiceState
  game: GameState,
  rack: RackState,
  exchange: ExchangeState,
  turn: TurnState,
  players: PlayerInfo[],
  board: BoardState,
  lastTurn: LastTurnState,
};
export type ServiceState = {
  gameState: RequestState,
}

export type RequestState = {
  status: RequestStatus,
//Does anything read error or is it processed immediately?
  error: ErrorState,
}

export type ErrorState = {
  message: string
}


export type LastTurnState = {
  action: LastTurnActionEnum
  state: LastTurnStateEnum
  playerIndex: number, 
  loseTurnPlayerIndex?: number,
  points: number,
  newTileIndexes: number[],
  wordsPlayed: String[],
  enactChallenge: boolean | null
}

export enum RequestStatus {UNKNOWN, REQUESTING, SUCCESSFUL, ERRORED}
export enum GameStatus {UNKNOWN, PENDING, ABANDONED, ACTIVE, ENDGAME, ABORTED, FINISHED}

export type GameState = {
  version: string,
  id: string,
  playerId: string,
  playerIndex: number,
  activePlayerIndex: number,
  isPlayerUp: boolean,
  canChallenge: boolean,
  winningPlayerIndex: number,
  status: GameStatus,
};

export type RackState = {
  tiles: Tile[],
  sortedTiles: Tile[]
};
export type ExchangeState = {
  tiles: Tile[],
};
export type Tile = {
  letter: string
  blank: boolean
}

export type BoardState = {
  activeIndex: number,
  focusedIndex: number,
  squares : SquareState[],
};
export type PlayerInfo = {
  id?: string,
  name: string,
  score: number,
  skipTurnCount: number,
  forfeited: boolean
};
export type TurnState = {
  playedTiles: PlayedTile[]
}
export type PlayedTile = {
    index: number,
    tile: Tile
}

export type SquareState = {
  tile: Tile,
  modifier: string,
  direction: Direction,
 }
 
export type StorageState = {
  id: string,
  playerId: string,
}