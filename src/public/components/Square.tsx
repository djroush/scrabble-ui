import React from 'react';

import '../css/Square.css';

import {SquareProps} from '../containers/Square'; 

const SquareView = (props: SquareProps) => {
  
  const {index, letter, direction, modifier, onMouseDown, onKeyPress} = props;
  
  const hasTile = letter !== undefined && letter !== null;
  const isBlank = hasTile && letter === " ";
  const dirClass: string = direction === null  ? "" : " " + direction;
  const squareClass="square " + modifier + dirClass;
  const blank = isBlank ? " blank" : "";
  const tileClass= (hasTile ? "tile" : "") + blank;
  const innerSpan = !hasTile ? '' : <span className={tileClass}>{letter}</span>  
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

export default SquareView;
