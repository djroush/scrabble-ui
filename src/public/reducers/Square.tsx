import { AppState, BoardState, RackState, TurnState, SquareState, Tile } from '../store/State';
import Board from '../components/Board';

export const squareClick = (appState: AppState, newIndex: number) => {
  let {activeIndex, squares} = appState.board;
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
  
  appState.board = {
    activeIndex,squares
  } 
  return appState;
};

export const squareKeyPress = (appState: AppState, newIndex: number, letter: string) => {
  const boardState: BoardState = appState.board;
  const rackState: RackState = appState.rack;
  const turnState: TurnState = appState.turn;
  const newLetters: string[] = [...rackState.letters];
  const newSquares: SquareState[] = [...boardState.squares]
  const newSquare: SquareState = newSquares[newIndex];
  const newTiles: Tile[] = [...turnState.tiles] 

  //Do nothing if a tile already exists in this spot on the board
  if (newSquare.letter) {
    return appState;
  }
  
  //Check if this letter (or a blank) exists on the rack
  let rackIndex: number = 0;
  let blankIndex: number = -1;
  for (let index = 0; index < rackState.letters.length; index++) {
    const rackLetter = rackState.letters[index]; 
    if (rackLetter == letter) {
      break;
    } else if (' ' == rackLetter) {
      blankIndex = rackIndex;
    }
    rackIndex++;
  };
  //Remove the letter from the rack and put it on the board
  //TODO: add tiles to turn as well
  const rackSize = rackState.letters.length;
  if (rackIndex < rackSize || blankIndex >= 0) {
      const playedLetterIndex = rackIndex < rackSize ? rackIndex : blankIndex;
      newLetters.splice(playedLetterIndex, 1)[0];
      //TODO: DO I NEED TO DO SOME SHENANIGANS HERE FOR BLANKS?
      newSquare.letter = letter ;
      rackState.letters = newLetters;
      boardState.squares[newIndex] = newSquare
      const newTile: Tile = {
        index: newIndex,
        letter: letter
      }
      newTiles.push(newTile);
      turnState.tiles = newTiles;
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
      boardState.activeIndex = nextActiveIndex;
      //TODO: focus on nextActiveSquare
    }
  } else {
    const row = newIndex / Board.HEIGHT;
    if (row < Board.HEIGHT -1) {
      const nextActiveIndex = newIndex + Board.WIDTH;
      const nextActiveSquare = newSquares[nextActiveIndex];
      nextActiveSquare.direction = newSquare.direction;
      newSquare.direction = null;
      boardState.activeIndex = nextActiveIndex;
    }
  }
  //These aren't needed right?
//  appState.board = boardState;
//  appState.rack = rackState;
//  appState.turn = turnState;
  
  return appState;
};