import React, {useEffect, useRef} from 'react';

import '../css/Square.css';

import {SquareProps} from '../containers/Square'; 

const SquareView = (props: SquareProps) => {
  const tdElem = useRef(null);
  useEffect(() => {
    if (props.isActive) {
      tdElem.current.focus();
    }
  });
  
  const {index, letter, direction, modifier, onMouseUp, onMouseDown, onKeyDown} = props;
  
  const hasTile = !!letter;
  const isBlank = hasTile && letter === " ";
  const dirClass: string = direction === null  || hasTile ? "" : " " + direction;
  const squareClass= "square " + modifier + dirClass;
  const blank = isBlank ? " blank" : "";
  const tileClass= (hasTile ? "tile" : "") + blank;
  const innerSpan = !hasTile ? '' : <span className={tileClass}>{letter}</span>  
   return (
    <td ref={tdElem}
        tabIndex={index+100} 
        data-index={index} 
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown} 
        onKeyDown={onKeyDown}
        className={squareClass}>
      {innerSpan}
    </td>
  );
}

export default SquareView;
