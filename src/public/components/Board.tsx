import React from 'react';

import '../css/Board.css';

import Square from '../components/Square';
import {BoardState} from '../reducers/State'

class Board extends React.Component<unknown, BoardState> {
  static WIDTH: number = 15;
  static HEIGHT: number = 15; 
 /* scrabbleClient: Scrabble.Client = ScrabbleClientFactory.getInstance(); */

  constructor(props: unknown) {
    super(props);
    this.squareOnClick = this.squareOnClick.bind(this);
    this.squareOnKeyPress = this.squareOnKeyPress.bind(this);
  }

  squareOnClick = (event: React.MouseEvent) => {
     const target = event.currentTarget;
     const row = parseInt(target.getAttribute('data-row'));
     const col = parseInt(target.getAttribute('data-col'));
     const eventActiveIndex = row*Board.WIDTH + col;   
     console.log("active square: (" + row + ", " + col + ")");
     let {activeIndex, direction} = this.state;
     if (activeIndex !== null && activeIndex === eventActiveIndex) {
        if (direction === "horizontal") {
          direction = "vertical";
        } else {
          direction = "horizontal";
        }
     } else {
      activeIndex = eventActiveIndex
      direction = "horizontal"
    }
    this.setState({
        activeIndex: activeIndex,
          direction: direction,
    })
  };
  
  squareOnKeyPress = () => {
    
  };
  squareOnBlur = (event: React.MouseEvent) => {
    const a = event.target;
    const b = event.currentTarget;
    const c = event.relatedTarget;
  };

  render(): JSX.Element { 
    const {activeIndex, direction, squares} = this.state
    const rowsElems: JSX.Element[] = [];
    for(let row = 0; row < Board.HEIGHT; row++) {
      const rowElems : JSX.Element[] = [];
      for(let col = 0; col < Board.WIDTH; col++) {
        const index = row * Board.WIDTH + col;
        const activeSquare: boolean = index === activeIndex;
        const square = <Square key={index} 
          index={index} 
          direction={activeSquare ? direction : null}
          onClick={this.squareOnClick} 
          onKeyPress={this.squareOnKeyPress}
          onBlur={this.squareOnBlur} 
          ref={(node) => {
            squares.push(node);
          }} 
        />;
        rowElems.push(square);
      }
      rowsElems.push(<tr key={row}>{rowElems}</tr>); 
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
}

Board.prototype.state = {
    activeIndex: null,
    direction: null,
    squares: [],
  }

export default Board;
