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
  lastPlayerToPlayTilesIndex: number
  winningPlayerIndex: number
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

export type LastTurnStateEnum = "AWAITING_ACTION" | "AWAITING_CHALLENGE"

export type LastTurnActionEnum = 'UNKNOWN' | 'GAME_STARTED' | 'PLAY_TILES' | 'EXCHANGE_TILES' | 'PASS_TURN' | 'CHALLENGE_TURN' | 'FORFEIT_GAME'

export type LastTurn = {
  action: LastTurnActionEnum,
  state: LastTurnStateEnum
  playerIndex: number, 
  loseTurnPlayerIndex?: number,
  points: number,
  wordsPlayed: String[],
  newTileIndexes: number[]
}


export type Player = {
  id: string,
  name: string,
  score: number,
  skipTurnCount: number,
  forfeited: boolean 
}

export type GameResponseError = {}
