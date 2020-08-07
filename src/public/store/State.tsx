//TODO: this is a duplicate definition, remove it later
export type Direction = 'horizontal' | 'vertical' | null 
export type Modifier = '' | 'center2' | 'word3' | 'word2' | 'letter3' | 'letter2'; 


export type AppState = {
  service: ServiceState
  game: GameState,
  rack: RackState,
  exchange: ExchangeState,
  turn: TurnState,
  players: PlayersState,
  board: BoardState,
  /* Game stuff */
};
export type ServiceState = {
  gameUnknown: RequestState,
  gamePending: RequestState,
}

export type RequestState = {
  status: RequestStatus,
  data: any,
  error: ErrorState,
}

export type ErrorState = {
  message: string
}

export enum RequestStatus {UNKNOWN, REQUESTING, SUCCESSFUL, ERRORED}
export enum GameStatus {UNKNOWN, PENDING, ABANDONED, ACTIVE, ENDGAME, ABORTED, FINISHED}

//FIXME: Replace status with an enum
export type GameState = {
  pending: {
    name : string,
    gameId: string,
  }
  id: string,
  playerId: string,
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
export type PlayersState = {
  info: PlayerInfo[];
  activePlayerIndex: number
};
export type PlayerInfo = {
  id: string,
  name: string,
  score: number,
};
export type TurnState = {
  tiles: Tile[]
}
export type Tile = {
    index: number,
    letter: string
}

export type SquareState = {
  letter: string,
  modifier: string,
  direction: Direction,
 }