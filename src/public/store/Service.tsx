export type GameResponseSuccess = {
  game: Game,
  rack: Rack
  players: Player[],
  board: Board,
  lastTurn: LastTurn,
};

export type Game = {
  id: string,
  playerId: string,
  playerIndex: number,
  version: string,
  state: string,  
  activePlayerIndex: number
}


export type Rack = {
  tiles: string[]
}
export type Board = {
  squares: Tile[],
}

export type Tile = {
  letter: string,
  blank: boolean
} 

export type LastTurn = {
  action: 'UNKNOWN' | 'PLAY_TILES' | 'EXCHANGE_TILES' | 'PASS_TURN' | 'CHALLENGE_TURN' | 'FORFEIT_GAME'
  playerIndex: number, 
  loseTurnPlayerIndex?: number,
  points: number,
}


export type Player = {
  id: string,
  name: string,
  score: number,
  skipTurnCount: number,
  forfeited: boolean 
}

export type GameResponseError = {}
