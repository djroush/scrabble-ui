import React from 'react';

import '../css/Square.css'

type SquareProps = {
  index: number,
  direction: "horizontal" | "vertical" | null;
  onClick: (event: React.MouseEvent) => void;
  onKeyPress: (event: React.KeyboardEvent) => void;
  onBlur: (event: React.MouseEvent) => void;
};

type SquareState = {
  tile: String,  
};

class Square extends React.PureComponent<SquareProps, SquareState> {
   row: number;
   col: number;
 
  constructor(props: SquareProps) {
    super(props);
    const {index} = props;
    this.row = Math.floor(index / 15);
    this.col = index % 15; //does this go negative?
  }

  getModifier = (): string => {
    const row = this.row;
    const col = this.col;
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
  
  render(): JSX.Element {
    const { direction, onClick, onKeyPress } = this.props;
    const { tile } = this.state;
    const hasTile = tile !== undefined && tile !== null;
    const isBlank = hasTile && tile === " ";
    const modifier: string = this.getModifier();
    const dirClass: string = direction === null || direction === undefined ? "" : " " + direction;
    const squareClass="square " + modifier + dirClass;
    const blank = isBlank ? " blank" : "";
    const tileClass= (hasTile ? "tile" : "") + blank;
    const innerSpan = !hasTile ? '' : <span className={tileClass}>{tile}</span>  
 
    return (
      <td data-row={this.row} data-col={this.col} className={squareClass} onClick={onClick} onKeyPress={onKeyPress}>
      {innerSpan}</td>
    );
  }
}

Square.prototype.state = {
  tile: null
};
export default Square;
