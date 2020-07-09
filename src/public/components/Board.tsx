import React from 'react';

import '../css/Board.css';

import Square from '../components/Square';

type BoardState = {
  activeIndex: number;
  dirHoriz: boolean;
}

class Board extends React.Component<unknown, BoardState> {
  static WIDTH: number = 15;
  static HEIGHT: number = 15; 
 /* scrabbleClient: Scrabble.Client = ScrabbleClientFactory.getInstance(); */

  squares : Square[] = [];
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
     const {activeIndex} = this.state;
     if (activeIndex !== null && activeIndex === eventActiveIndex) {
//      this.board.changeActiveDirection();
     } else {
        this.setState({
          activeIndex: eventActiveIndex
        });
    }   
  };
  
  squareOnKeyPress = () => {
    
  };


  render(): JSX.Element {
    const {activeIndex, dirHoriz} = this.state;
    
    const rowsElems: JSX.Element[] = [];
    for(let row = 0; row < Board.HEIGHT; row++) {
      const rowElems : JSX.Element[] = [];
      for(let col = 0; col < Board.WIDTH; col++) {
        const index = row * Board.WIDTH + col;
        const direction = activeIndex === index ? dirHoriz : null   
        const square = <Square key={index} 
          index={index} 
          direction={direction}
          onClick={this.squareOnClick} 
          onKeyPress={this.squareOnKeyPress} 
          ref={(node) => {
            this.squares.push(node);
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
  dirHoriz: true,
};

export default Board;
