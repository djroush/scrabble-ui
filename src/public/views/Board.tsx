import React from 'react';

import '../css/Board.css';

import Square from '../containers/Square';

import {BoardProps} from '../containers/Board'

const Board = (props: BoardProps) => {
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
      rowsElems.push(<tr key={row} data-row={row}>{rowElems}</tr>); 
    }
  }
    
  return (
  <div className="board"> 
    <table>
      <tbody>
        {rowsElems}
      </tbody>
    </table>
  </div>
  );
}
export default Board;
