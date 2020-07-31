import React from 'react';
import { connect } from 'react-redux';

import {SquareState, AppState} from '../store/State';

import BoardView from '../views/Board';

export type BoardStateProps = {
    activeIndex: number,
    squares: SquareState[],
}
export type BoardProps = BoardStateProps;

function Board(props: BoardProps) {
    return <BoardView {...props} />
}
  
function mapStateToProps(state: AppState): BoardStateProps {
  return {
    activeIndex: state.board.activeIndex,
    squares: state.board.squares
  }
};


export default connect(mapStateToProps)(Board);
