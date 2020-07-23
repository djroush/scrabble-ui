import { AppState, BoardState, RackState } from '../store/State';

const RACK_MAX_SIZE = 7;
const RACK_MIN_SIZE = 0;

export const takeFromRack = (appState: AppState, letter: string, index: number ) => {
  const rackState: RackState = appState.rack;
  const boardState: BoardState = appState.board;
  
  if (!!boardState.squares[index].letter) {
    return appState;
  }
  
  let rackIndex: number = 0;
  let blankIndex: number = -1;
  for (index = 0; index < rackState.letters.length; index++) {
    const rackLetter = rackState.letters[index]; 
    if (rackLetter == letter) {
      break;
    } else if (' ' == rackLetter) {
      blankIndex = rackIndex;
    }
    rackIndex++;
  };
  
  if (rackIndex < RACK_MAX_SIZE || blankIndex >= RACK_MIN_SIZE) {
      const playedLetterIndex = rackIndex < RACK_MAX_SIZE ? rackIndex : blankIndex;
      rackState.letters.splice(playedLetterIndex, 1);
      boardState.squares[index].letter = letter;
  }
  return appState;
}
