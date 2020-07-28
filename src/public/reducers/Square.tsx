import { AppState, BoardState, RackState, TurnState, SquareState, Tile } from '../store/State';
import { returnLetters, returnLetter } from '../reducers/Rack';
import Board from '../components/Board';

export const squareMouseDown = (appState: AppState, newIndex: number) => {
  let {activeIndex, focusedIndex, squares} = appState.board;

  focusedIndex = newIndex;  
  
  //ignore clicks if tiles are already played on the board
  const areTilesPlayed = appState.turn.tiles.length > 0   
  if (!areTilesPlayed) {
    const oldIndex = activeIndex;
    const oldSquare = squares[oldIndex];
    const newSquare = squares[newIndex];
  
    if (oldIndex !== null && oldIndex === newIndex) {
      if (!oldSquare.letter) {
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

export const squareMouseUp = (appState: AppState) => {
  const newBoard : BoardState = {...appState.board};
  newBoard.focusedIndex = newBoard.activeIndex;
  
  appState.board = newBoard;
  return appState;
};


export const squareKeyDown = (appState: AppState, newIndex: number, key: string, shiftKey: boolean) => {
  const {board, rack, turn} = {...appState};
  
  const newSquares: SquareState[] = [...board.squares]
  const newSquare: SquareState = newSquares[newIndex];
  const newLetters: string[] = [...rack.letters];
  const {tiles} = {...turn} 

  //Do nothing if a tile already exists in this spot on the board
  
  const areTilesPlayed: boolean = tiles.length > 0;
  if (key === 'BACKSPACE' && areTilesPlayed) {
    if (shiftKey) {
      return returnLetters(appState);
    } else {
      return returnLetter(appState); 
    }
  }
  if (key === ' ') {
    squareMouseDown(appState, newIndex);
  }
  
  const isAlphabetic: boolean = key >= 'A' && key <= 'Z';
  if (newSquare.letter || !isAlphabetic || newIndex != appState.board.activeIndex) {
    return appState;
  }
  
  //Check if this letter (or a blank) exists on the rack
  
  
  let rackIndex: number = 0;
  let blankIndex: number = -1;
  const rackSize = newLetters.length;
  for (let index = 0; index < rackSize; index++) {
    const rackLetter = newLetters[index]; 
    if (rackLetter == key) {
      break;
    } else if (' ' == rackLetter) {
      blankIndex = rackIndex;
    }
    rackIndex++;
  };
  //Remove the letter from the rack and put it on the board
  //TODO: add tiles to turn as well
  if (rackIndex < rackSize || blankIndex >= 0) {
      const playedLetterIndex = rackIndex < rackSize ? rackIndex : blankIndex;
      newLetters.splice(playedLetterIndex, 1)[0];
      //TODO: DO I NEED TO DO SOME SHENANIGANS HERE FOR BLANKS?
      newSquare.letter = key;
      rack.letters = newLetters;
      board.squares[newIndex] = newSquare;
      const newTile: Tile = {
        index: newIndex,
        letter: key
      }
      tiles.push(newTile);
      turn.tiles = tiles;
  } else {
    return appState;
  }
  
  //Move the cursor to the next space unless it's at the edge of the board'
  if (newSquare.direction === 'horizontal')  {
    //TODO: need to add a loop here to skip spaces which already have tiles
    const col = newIndex % Board.WIDTH;
    if (col < Board.WIDTH - 1) {
      const nextActiveIndex = newIndex + 1;
      const nextActiveSquare = newSquares[nextActiveIndex];
      nextActiveSquare.direction = newSquare.direction;
      newSquare.direction = null;
      board.activeIndex = nextActiveIndex;
      board.focusedIndex = nextActiveIndex;
    }
  } else {
    const row = newIndex / Board.HEIGHT;
    if (row < Board.HEIGHT -1) {
      const nextActiveIndex = newIndex + Board.WIDTH;
      const nextActiveSquare = newSquares[nextActiveIndex];
      nextActiveSquare.direction = newSquare.direction;
      newSquare.direction = null;
      board.activeIndex = nextActiveIndex;
      board.focusedIndex = nextActiveIndex;
    }
  }
  
  return appState;
};