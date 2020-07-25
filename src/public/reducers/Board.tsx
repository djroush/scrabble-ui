import { Modifier, Direction, SquareState, BoardState } from '../store/State';

export const getNewBoard = (): BoardState => {
  const activeIndex: number = null;
  const focusedIndex: number = null;
  const direction: Direction = null;
  const squares: SquareState[] = new Array<SquareState>();
  for (let index = 0; index < 255; index ++) {
    const letter: string = null;
    const modifier: Modifier = getModifier(index);
    const square: SquareState = {
      letter, modifier, direction
    }
    squares.push(square);
  }
  
  return {
    activeIndex, focusedIndex, squares
  };
};

function getModifier(index: number) {
  const row = Math.floor(index / 15);
  const col = index % 15;

  //This logic should be elsehwere?
  if (row == 7 && col == 7) {
    return 'center2';
  } else if ((row % 7 == 0 && col % 8 ==  3) ||
    (row %  8 == 3 &&  col % 7 ==  0) ||
    (row % 10 == 2 && (col == 6 || col == 8)) ||
    (row % 10 == 2 && (col == 6 || col == 8)) ||
    ((row == 6 || row == 8) && (col % 10 == 2 || col == 6 || col == 8))
     ) {
    return 'letter2';
  } else if (row % 4 == 1 && col % 4 == 1 && !(row % 12 == 1 && col % 12 == 1)) {
    return 'letter3';
  } else if ((row == col || row + col == 14) &&
          ((row >= 1 && row <= 4) || (row >= 10 && row <= 13)))  {
    return 'word2';
    //The center tile is handled above by DOUBLE_WORD
  } else if (row % 7 == 0 && col % 7 == 0) {
    return 'word3';
  }
  return '';
};


