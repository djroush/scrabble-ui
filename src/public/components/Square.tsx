import React from 'react';

import '../css/Square.css'
import {Direction} from '../reducers/State'

type SquareProps = {
  index: number;
  tile?: string;
  modifier: Modifier;
  direction: Direction;
  onMouseDown: (event: React.MouseEvent) => void;
  onKeyPress: (event: React.KeyboardEvent) => void;
};
export type Modifier = '' | 'center2' | 'word3' | 'word2' | 'letter3' | 'letter2'; 


//TODO: make this a pure function
const Square = (props: SquareProps) => {
  const { index, tile, modifier, direction, onMouseDown, onKeyPress } = props;
  
  const hasTile = tile !== undefined && tile !== null;
  const isBlank = hasTile && tile === " ";
  const dirClass: string = direction === null  ? "" : " " + direction;
  const squareClass="square " + modifier + dirClass;
  const blank = isBlank ? " blank" : "";
  const tileClass= (hasTile ? "tile" : "") + blank;
  const innerSpan = !hasTile ? '' : <span className={tileClass}>{tile}</span>  
   return (
    <td tabIndex={index} 
        data-index={index} 
        onMouseDown={onMouseDown} 
        onKeyPress={onKeyPress} 
        className={squareClass}>
      {innerSpan}
    </td>
  );
}

export default Square;
