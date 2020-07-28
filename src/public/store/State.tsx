//TODO: this is a duplicate definition, remove it later
export type Direction = 'horizontal' | 'vertical' | null 
export type Modifier = '' | 'center2' | 'word3' | 'word2' | 'letter3' | 'letter2'; 


export type AppState = {
  game: GameState,
  rack: RackState,
  board: BoardState,
  turn: TurnState,
  players: PlayersState,
  /* Game stuff */
};
export type GameState = {
  pending: {
    name : string
    gameId: string,
  }
  gameId: string,
  playerId: string,
  status: string, 
};
export type RackState = {
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