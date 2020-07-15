import Square from '../components/Square'

//TODO: this is a duplicate definition, remove it later
type Direction = 'horizontal' | 'vertical' | null 

export type AppState = {
  rack: RackState,
  board: BoardState,
  playerDisplay: PlayerDisplayState,
  /* Game stuff */
};
export type RackState = {
  letters: string[];
};
export type SquareState = {
  index: number,
  tile?: String,  
};
export type BoardState = {
  activeIndex: number;
  direction: Direction;
  squares : Square[];
};
export type PlayerState = {
  name: string,
  score: number,
};
export type PlayerDisplayState = {
  players: PlayerState[];
  activePlayerIndex: number
};


