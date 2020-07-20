import React from 'react';

import '../css/Board.css';

import Square, {Modifier} from '../components/Square';
import {BoardState} from '../store/State';
import store from '../store/Store';
import * as Actions from '../actions/ActionCreator';

class Board extends React.Component<unknown, BoardState> {
  static WIDTH: number = 15;
  static HEIGHT: number = 15; 
 /* scrabbleClient: Scrabble.Client = ScrabbleClientFactory.getInstance(); */

  constructor(props: unknown) {
    super(props);
    this.squareOnMouseDown = this.squareOnMouseDown.bind(this);
    this.squareOnKeyPress = this.squareOnKeyPress.bind(this);
  }

  squareOnMouseDown = (event: React.MouseEvent) => {
    const target = event.currentTarget;
    const index = parseInt(target.getAttribute('data-index'));
    console.log("active square: (" + index + ")");
        
    store.dispatch(Actions.updateActiveSquare(index));
  };
  
  squareOnKeyPress = (event: React.KeyboardEvent) => {
    const letter = event.key.toUpperCase();
    const index = parseInt(event.currentTarget.getAttribute("data-index"));
    console.log("In squareOnKeyPress(): " + letter + " ->  " + index);
  
    if (letter == ' ') {
      store.dispatch(Actions.updateActiveSquare(index));
    } 
    const isAlphabetic: boolean = letter.length === 1 && letter >= 'A' && letter <= 'Z';
    if (isAlphabetic) {
       store.dispatch(Actions.playRackLetter(letter, index));
    }
  };
  
  //FIXME: Is this right spot for this or should it be put into it's own class?
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


  render(): JSX.Element { 
    const {activeIndex, direction, tiles} = this.state
    const rowsElems: JSX.Element[] = [];
    for(let row = 0; row < Board.HEIGHT; row++) {
      const rowElems : JSX.Element[] = [];
      for(let col = 0; col < Board.WIDTH; col++) {
        const index = row * Board.WIDTH + col;
        const activeSquare: boolean = index === activeIndex;
        const modifier: Modifier = this.getModifier(index);
        const square = <Square key={index} 
          index={index} 
          tile={tiles[activeIndex]}
          modifier={modifier}
          direction={activeSquare ? direction : null}
          onMouseDown={this.squareOnMouseDown} 
          onKeyPress={this.squareOnKeyPress}
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
    tiles: new Array<string>(Board.WIDTH*Board.HEIGHT),
  }

export default Board;
