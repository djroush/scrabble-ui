import React from 'react';

import '../styles/BoardStyle.css';

import Square from '../containers/SquareContainer';

import {BoardProps} from '../containers/BoardContainer'

const BoardView = (props: BoardProps) => {
  const WIDTH: number = 15;
  const HEIGHT: number = 15; 
  const rowsElems: JSX.Element[] = [];
  if (!!props.squares) {
    for(let row = 0; row < HEIGHT; row++) {
      const rowElems : JSX.Element[] = [];
      for(let col = 0; col < WIDTH; col++) {
        const index = row * WIDTH + col;
        const square = <Square key={index} index={index}/>;
        rowElems.push(square);
      }
      rowsElems.push(<div key={row} data-row={row}>{rowElems}</div>); 
    }
  }
  
  return (
    <div className="board">  
      {rowsElems}
    </div>
  );
  

}
export default BoardView;
