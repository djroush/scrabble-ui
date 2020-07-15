import React from 'react';

import '../css/Square.css'

type Direction = 'horizontal' | 'vertical' | null;
type Modifier = '' | 'center2' | 'word3' | 'word2' | 'letter3' | 'letter2'; 

type SquareState = {
  modifier: Modifier;
  tile?: string;
}

type SquareProps = {
  index: number;
  direction: Direction;
  onClick: (event: React.MouseEvent) => void;
  onKeyPress: (event: React.KeyboardEvent) => void;
  onBlur: (event: React.MouseEvent) => void;
};


class Square extends React.PureComponent<SquareProps, SquareState> {
  constructor(props: SquareProps) {
    super(props);
    const {index} = props;
    
    const modifier = this.getModifier(index);
    this.setState({
      modifier: modifier,
      tile: null
    })
  }

  //THis is blurring logic, d
  getModifier = (index: number): Modifier => {
    
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
  
  //TODO: need to add set tile somewhere
  
  //ToDO: move this back to render and worry about making it a pure function later 
  render(): JSX.Element {
    const { index, direction, onClick, onKeyPress } = this.props;
    const {tile, modifier} = this.state;
    
    const hasTile = tile !== undefined && tile !== null;
    const isBlank = hasTile && tile === " ";
    const dirClass: string = direction === null  ? "" : " " + direction;
    const squareClass="square " + modifier + dirClass;
    const blank = isBlank ? " blank" : "";
    const tileClass= (hasTile ? "tile" : "") + blank;
    const innerSpan = !hasTile ? '' : <span className={tileClass}>{tile}</span>  
 
    return (
      <td data-index={index} className={squareClass} onClick={onClick} onKeyPress={onKeyPress}>
      {innerSpan}</td>
    );
  }
}

Square.prototype.state = {
    tile: null,
    modifier: ''
}


export default Square;
