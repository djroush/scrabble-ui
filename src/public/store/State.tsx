//TODO: this is a duplicate definition, remove it later
export type Direction = 'horizontal' | 'vertical' | null 
export type Modifier = '' | 'center2' | 'word3' | 'word2' | 'letter3' | 'letter2'; 


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
  squares : SquareState[],
};
export type PlayerDisplayState = {
  players: PlayerState[];
  activePlayerIndex: number
};
export type PlayerState = {
  name: string,
  score: number,
};

export type SquareState = {
  letter: string,
  modifier: string,
  direction: Direction,
}