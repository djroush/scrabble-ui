import React from 'react';
import { connect } from 'react-redux';

import '../css/Board.css';

import {SquareState, BoardState, AppState} from '../store/State';
import AppStore from '../store/Store';
import * as Actions from '../actions/ActionCreator';
import Square from '../containers/Square';


type BoardProps = {
    activeIndex: number,
    squares: SquareState[],
}
const store = AppStore

//TODO: useEffect to initialize squares

class Board extends React.Component<BoardProps, BoardState> {
  static WIDTH: number = 15;
  static HEIGHT: number = 15; 
 /* scrabbleClient: Scrabble.Client = ScrabbleClientFactory.getInstance(); */

  constructor(props: BoardProps) {
    super(props);
    this.squareOnMouseDown = this.squareOnMouseDown.bind(this);
    this.squareOnKeyPress = this.squareOnKeyPress.bind(this);
    
    store.dispatch(Actions.initializeBoardSquares());
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
  
  render(): JSX.Element { 
    //TODO: this part is wrong, redo it later
    const rowsElems: JSX.Element[] = [];
    for(let row = 0; row < Board.HEIGHT; row++) {
      const rowElems : JSX.Element[] = [];
      for(let col = 0; col < Board.WIDTH; col++) {
        const index = row * Board.WIDTH + col;
        const square = <Square key={index} index={index}/>;
        rowElems.push(square);
      }
      rowsElems.push(<tr key={row} data-row={row}>{rowElems}</tr>); 
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

function mapStateToProps(state: AppState): BoardProps {
  return {
    activeIndex: state.board.activeIndex,
    squares: state.board.squares
  }
};

export default connect(mapStateToProps)(Board);
