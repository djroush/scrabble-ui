import { AppState, Tile, SquareState, Direction } from '../store/State';

export const shuffleLetters = (appState: AppState) => {
  const letters: string[] = appState.rack.letters;
  let shuffledLetters = [];
  
  while (letters.length > 0) {
    const index: number = Math.floor(Math.random() * letters.length);
    const letter: string = letters.splice(index, 1)[0];
    shuffledLetters.push(letter);
  } 
  appState.rack.letters = shuffledLetters;
  
  return appState;
}

export const returnLetters = (appState: AppState) => {
  const returnedLetters: string[] = [...appState.rack.letters];
  const turnTiles: Tile[] = appState.turn.tiles;
  const squares: SquareState[] = [...appState.board.squares];
  let activeIndex = appState.board.activeIndex;
  const oldDirection: Direction = squares[activeIndex].direction;
  
  squares[activeIndex].direction = null;
  turnTiles.forEach((tile: Tile) => {
      const {index, letter} = tile;
      squares[index].letter = null;
      returnedLetters.push(letter);
      activeIndex = Math.min(activeIndex, index);
  });
  const focusedIndex = activeIndex;
  squares[activeIndex].direction = oldDirection;
  appState.turn.tiles = [];
  appState.rack.letters = returnedLetters;
  appState.board = {
   activeIndex, focusedIndex, squares
  }
  
  return appState;
}

export const returnLetter = (appState: AppState) => {
  const returnedLetters: string[] = [...appState.rack.letters];
  const turnTiles: Tile[] = appState.turn.tiles;
  const squares: SquareState[] = [...appState.board.squares];
  let activeIndex = appState.board.activeIndex;
  const direction: Direction = squares[activeIndex].direction;
  
  
  const tilesPlayed = turnTiles.length;
  const areTilesPlayed = tilesPlayed > 0;
  if (areTilesPlayed) {
    
  }
  squares[activeIndex].direction = null;
  const {index, letter} = turnTiles[tilesPlayed-1];
  squares[index].letter = null;
  returnedLetters.push(letter);
  activeIndex = index

  const focusedIndex = activeIndex;
  squares[activeIndex].direction = direction;
  appState.turn.tiles.splice(tilesPlayed-1, 1);
  appState.rack.letters = returnedLetters;
  appState.board = {
    activeIndex, focusedIndex, squares
  }
  
  return appState;
}