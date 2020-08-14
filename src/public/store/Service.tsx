export type GameResponseSuccess = {
  id: string,
  playerId: string,
  version: string,
  state: string,
  players: Player[],
};

export type Player = {
  id: string,
  name: string,
  rack: {
    tiles: string[]
  }
  score: number,
  skipTurnCount: number,
  isForfeited: boolean 
}

export type GameResponseError = {}
