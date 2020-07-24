import React, {Dispatch} from 'react'
import { connect } from 'react-redux';

import {AppAction} from '../actions/Actions'
import SquareView from '../components/Square'
import {AppState, Modifier, Direction} from '../store/State'

import {squareKeyPress, squareClick} from '../actions/ActionCreator'

export type SquareProps = SquareOwnProps & SquareStateProps & SquareDispatchProps

type SquareOwnProps =  {
  index: number;
}
type SquareStateProps = {
  letter?: string;
  modifier: Modifier;
  direction: Direction;
}; 
type SquareDispatchProps = {
  onMouseDown: () => void;
  onKeyPress: (event: React.KeyboardEvent) => void;
}; 

const mapStateToProps = (state: AppState, props: SquareOwnProps) => {
  return {
    letter: state.board.squares[props.index].letter,
    modifier: state.board.squares[props.index].modifier,
    direction: state.board.squares[props.index].direction,
  }
};
const mapDispatchToProps = (dispatch: Dispatch<AppAction>, props: SquareOwnProps) => {
  return {
    onMouseDown: () => dispatch(squareClick(props.index)),
    onKeyPress: (event: React.KeyboardEvent) => dispatch(squareKeyPress(props.index, event.key))
  }
};

function Square(props: SquareProps){
  return <SquareView {...props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Square);