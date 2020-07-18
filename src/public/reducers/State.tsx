//TODO: this is a duplicate definition, remove it later
export type Direction = 'horizontal' | 'vertical' | null 

export type AppState = {
  rack: RackState,
  board: BoardState,
  playerDisplay: PlayerDisplayState,
  /* Game stuff */
};
export type RackState = {
  letters: string[];
};
export type BoardState = {
  activeIndex: number;
  direction: Direction,
  tiles : string[],
};
export type PlayerDisplayState = {
  players: PlayerState[];
  activePlayerIndex: number
};
export type PlayerState = {
  name: string,
  score: number,
};
