import React, {Dispatch} from 'react';
import { connect } from 'react-redux';

import '../css/Board.css';

import {SquareState, BoardState, AppState} from '../store/State';
import {AppAction} from '../actions/Actions'
import * as Actions from '../actions/ActionCreator';
import Square from '../containers/Square';


type BoardOwnProps = {
    activeIndex: number,
    squares: SquareState[],
}
type ProviderProps = {
  dispatch: Dispatch<AppAction>
}

type BoardProps = BoardOwnProps & ProviderProps

//TODO: useEffect to initialize squares

class Board extends React.Component<BoardProps, BoardState> {
  static WIDTH: number = 15;
  static HEIGHT: number = 15; 

  constructor(props: BoardProps) {
    super(props);
    
    props.dispatch(Actions.initializeBoardSquares());
  }
  
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

function mapStateToProps(state: AppState): BoardOwnProps {
  return {
    activeIndex: state.board.activeIndex,
    squares: state.board.squares
  }
};

export default connect(mapStateToProps)(Board);
