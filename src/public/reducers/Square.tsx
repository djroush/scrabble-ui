import { AppState, BoardState, SquareState, Tile, PlayedTile, GameStatus } from '../types/State';
import { returnPlayedTiles, returnPlayedTile } from '../reducers/Rack';

const BOARD_WIDTH = 15;
const BOARD_HEIGHT = 15;

const isBoardActive = (appState: AppState): boolean => {
  return appState.game.status >= GameStatus.ACTIVE && appState.game.status < GameStatus.ABORTED;
}

export const squareMouseDown = (appState: AppState, newIndex: number) => {
  if (!isBoardActive(appState)) {
    return appState;
  }

  let {activeIndex, focusedIndex, squares} = appState.board;

  focusedIndex = newIndex;  
  
  //ignore clicks if tiles are already played on the board
  const areTilesPlayed = appState.turn.playedTiles.length > 0   
  if (!areTilesPlayed) {
    const oldIndex = activeIndex;
    const oldSquare = squares[oldIndex];
    const newSquare = squares[newIndex];
  
    if (oldIndex !== null && oldIndex === newIndex) {
      if (!!oldSquare.tile && !oldSquare.tile.letter) {
        if (oldSquare.direction === "horizontal") {
          oldSquare.direction = "vertical";
        } else {
          oldSquare.direction = "horizontal";
        }
      } else {
        oldSquare.direction = null;
      }
    } else {
      activeIndex = newIndex;
      newSquare.direction = "horizontal";
      if (!!oldSquare) {
        oldSquare.direction = null;
      }
    }
  }
  
  appState.board = {
    activeIndex,focusedIndex,squares
  } 
  return appState;
};


export const squareMouseUp = (appState: AppState): AppState => {
  if (!isBoardActive(appState)) {
    return appState;
  }
  const newBoard : BoardState = {...appState.board};
  newBoard.focusedIndex = newBoard.activeIndex;
  
  appState.board = newBoard;
  return appState;
};

export const squareKeyDown = (appState: AppState, newIndex: number, key: string, shiftKey: boolean) => {
  if (!isBoardActive(appState)) {
    return appState;
  }
  
  const {board, rack, turn} = {...appState};
  
  const squares: SquareState[] = [...board.squares]
  const square: SquareState = squares[newIndex];
  const tiles: Tile[] = [...rack.tiles];
  
  const {playedTiles} = {...turn} 

  //Do nothing if a tile already exists in this spot on the board
  
  const areTilesPlayed: boolean = playedTiles.length > 0;
  if (key === 'BACKSPACE' && areTilesPlayed) {
    if (shiftKey) {
      return returnPlayedTiles(appState);
    } else {
      return returnPlayedTile(appState); 
    }
  }
  if (key === ' ') {
    squareMouseDown(appState, newIndex);
  }
  
  const isAlphabetic: boolean = key >= 'A' && key <= 'Z' && key.length === 1;
  if (!square.tile  || square.tile.letter || !isAlphabetic || newIndex != appState.board.activeIndex) {
    return appState;
  }
  
  //Check if this letter (or a blank) exists on the rack
  let rackIndex: number = -1;
  let blankIndex: number = -1;

  const rackSize = tiles.length;
  for (let index = 0; index < rackSize; index++) {
    const rackTile = tiles[index]; 
    if (rackTile.letter === key) {
      rackIndex = index;
    } else if (rackTile.blank) {
      blankIndex = index;
    }
  };
  //Take the tile from the rack, put it on the board and add it to the turn
  const hasTile = rackIndex >= 0;
  const hasBlankTile = blankIndex >= 0;

  if (hasTile || hasBlankTile) {
      const tileIndex =  hasTile && !(hasBlankTile && shiftKey) ? rackIndex : blankIndex;
      const rackTile = tiles.splice(tileIndex, 1)[0];
      rackTile.letter = key;
      square.tile = rackTile;
      rack.tiles = tiles;
      
      board.squares[newIndex] = square;
      const playedTile: PlayedTile = {
        index: newIndex,
        tile: rackTile
      }
      playedTiles.push(playedTile);
      turn.playedTiles = playedTiles;
  } else {
    return appState;
  }
  
  //Move the cursor to the next open space or to the edge of the board
  if (square.direction === 'horizontal')  {
    let nextColIndex: number = newIndex;
    let col = nextColIndex % BOARD_WIDTH;
    let prevColSquare: SquareState = square;
    while (col < BOARD_WIDTH - 1) {
      nextColIndex += 1;
      col = nextColIndex % BOARD_WIDTH;
      const nextColSquare = squares[nextColIndex];
      nextColSquare.direction = prevColSquare.direction;
      prevColSquare.direction = null;
      board.activeIndex = nextColIndex;
      board.focusedIndex = nextColIndex;
      if (!nextColSquare.tile.letter) {
        break;
      }
      prevColSquare = nextColSquare;
      
    }
  } else {
    let nextRowIndex: number = newIndex;
    let row = Math.floor(nextRowIndex / BOARD_HEIGHT);
    let prevRowSquare: SquareState = square;
    while (row < BOARD_HEIGHT -1) {
      nextRowIndex += BOARD_WIDTH;
      row = Math.floor(nextRowIndex / BOARD_HEIGHT);
      const nextRowSquare = squares[nextRowIndex];
      nextRowSquare.direction = prevRowSquare.direction;
      prevRowSquare.direction = null;
      board.activeIndex = nextRowIndex;
      board.focusedIndex = nextRowIndex;
      if (!nextRowSquare.tile.letter) {
        break;
      }
      prevRowSquare = nextRowSquare;
    }
  }
  
  return appState;
};
