import React from 'react';
import { connect } from 'react-redux';

import {SquareState, AppState, GameStatus} from '../types/State';

import BoardView from '../views/BoardView';

export type BoardStateProps = {
    activeIndex: number,
    squares: SquareState[],
    showBoard: boolean
}
export type BoardProps = BoardStateProps;

function Board(props: BoardProps) {
    return <BoardView {...props} />
}
  
function mapStateToProps(state: AppState): BoardStateProps {
  const gameStatus: GameStatus = state.game.status
  return {
    activeIndex: state.board.activeIndex,
    squares: state.board.squares,
    showBoard: gameStatus >= GameStatus.ACTIVE,
  }
};


export default connect(mapStateToProps)(Board);
