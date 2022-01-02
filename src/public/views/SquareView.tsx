import React, {useEffect, useRef} from 'react';

import '../styles/SquareStyle.css';

import {SquareProps} from '../containers/SquareContainer'; 

const SquareView = (props: SquareProps) => {
  const tdElem = useRef(null);
  useEffect(() => {
    if (props.isActive) {
      tdElem.current.focus();
    }
  });
  
  const {index, tile, direction, modifier, newTileIndexes, onMouseUp, onMouseDown, onKeyDown} = props;
  const hasTile = !!tile && !!tile.letter;
  const dirClass: string = direction === null  || hasTile ? "" : " " + direction;
  const squareClass= "square " + modifier + dirClass;
  const isNewTile = newTileIndexes.indexOf(index) > -1
  
 
  const isBlank = tile?.blank
  const blankClass = isBlank ? " blank" : "";
  const newClass = isNewTile ? " new" : ""; 
  const tileClass = (hasTile ? "tile" : "") + newClass + blankClass;

  const letter = tile && tile.letter ? tile.letter : "";
  const innerSpan = !hasTile ? '' : <span className={tileClass}>{letter}</span>
   return (
    <div ref={tdElem}
        tabIndex={index+100} 
        data-index={index} 
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown} 
        onKeyDown={onKeyDown}
        className={squareClass}>
      {innerSpan}
    </div>
  );
}

export default SquareView;
