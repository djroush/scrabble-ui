//TODO: this is a duplicate definition, remove it later
export type Direction = 'horizontal' | 'vertical' | null 
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
};
export type ServiceState = {
  gameUnknown: RequestState,
  gamePending: RequestState,
  gameRefresh: RequestState
}

export type RequestState = {
  status: RequestStatus,
//Does anything read error or is it processed immediately?
  error: ErrorState,
}

export type ErrorState = {
  message: string
}

export enum RequestStatus {UNKNOWN, REQUESTING, SUCCESSFUL, ERRORED}
export enum GameStatus {UNKNOWN, PENDING, ABANDONED, ACTIVE, ENDGAME, ABORTED, FINISHED}

export type GameState = {
  version: string,
  id: string,
  playerId: string,
  activePlayerIndex: number
  status: GameStatus, 

};
export type RackState = {
  letters: string[],
};
export type ExchangeState = {
  letters: string[],
};
export type BoardState = {
  activeIndex: number,
  focusedIndex: number,
  squares : SquareState[],
};
export type PlayerInfo = {
  id: string,
  name: string,
  score: number,
  skipTurnCount: number,
  isForfeited: boolean
};
export type TurnState = {
  tiles: Tile[]
}
export type Tile = {
    index: number,
    letter: string
}

export type SquareState = {
  isBlank: boolean,
  letter: string,
  modifier: string,
  direction: Direction,
 }