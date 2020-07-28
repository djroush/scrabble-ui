import React, {Dispatch} from 'react';
import { connect } from 'react-redux';

import {SquareState, AppState} from '../store/State';
import {AppAction} from '../actions/Actions';

import BoardView from '../components/Board';

export type BoardStateProps = {
    activeIndex: number,
    squares: SquareState[],
}
type ProviderProps = {
  dispatch: Dispatch<AppAction>
}
export type BoardProps = BoardStateProps & ProviderProps

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
