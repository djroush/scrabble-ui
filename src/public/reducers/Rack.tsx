
import { AppState, Tile, PlayedTile, SquareState, Direction } from '../store/State';

export const shuffleTiles = (appState: AppState) => {
  const tiles: Tile[] = appState.rack.tiles;
  let shuffledTiles: Tile[] = [];
  
  while (tiles.length > 0) {
    const index: number = Math.floor(Math.random() * tiles.length);
    const tile: Tile = tiles.splice(index, 1)[0];
    shuffledTiles.push(tile);
  } 
  appState.rack.tiles = shuffledTiles;
  
  return appState;
}

//TODO: need to upate logic to handle return from exchange or board!!!
export const returnPlayedTiles = (appState: AppState) => {
  //check if active index is set
  
  const returnedTiles: Tile[] = [...appState.rack.tiles];
  const playedTiles: PlayedTile[] = appState.turn.playedTiles;
  const squares: SquareState[] = [...appState.board.squares];
  let activeIndex = appState.board.activeIndex;
  const oldDirection: Direction = squares[activeIndex].direction;
  
  squares[activeIndex].direction = null;
  playedTiles.forEach((playedTile: PlayedTile) => {
      const {index, tile} = playedTile;
      squares[index].tile = {letter: null, blank: null};
      tile.letter = tile.blank ? ' ' : tile.letter;
      returnedTiles.push(tile);
      activeIndex = Math.min(activeIndex, index);
  });
  const focusedIndex = activeIndex;
  squares[activeIndex].direction = oldDirection;
  appState.turn.playedTiles = [];
  appState.rack.tiles = returnedTiles;
  appState.board = {
   activeIndex, focusedIndex, squares
  }
  
  return appState;
}

export const returnPlayedTile = (appState: AppState) => {
  const tiles: Tile[] = [...appState.rack.tiles];
  const playedTiles: PlayedTile[] = appState.turn.playedTiles;
  const squares: SquareState[] = [...appState.board.squares];
  let activeIndex = appState.board.activeIndex;
  const direction: Direction = squares[activeIndex].direction;
  
  const tilesPlayed = playedTiles.length;
  squares[activeIndex].direction = null;
  const returnedPlayedTile: PlayedTile = playedTiles.splice(tilesPlayed-1, 1)[0]
  const {index, tile} = returnedPlayedTile;
  squares[index].tile = {letter: null, blank: null};
  tile.letter = tile.blank ? ' ' : tile.letter;
  tiles.push(tile);
  activeIndex = index;

  const focusedIndex = activeIndex;
  squares[activeIndex].direction = direction;
  appState.turn.playedTiles = playedTiles;
  appState.rack.tiles = tiles;
  appState.board = {
    activeIndex, focusedIndex, squares
  }
  
  return appState;
}