import React, {Dispatch} from 'react'
import { connect } from 'react-redux';

import {AppAction} from '../actions/Actions'
import SquareView from '../components/Square'
import {AppState, Modifier, Direction} from '../store/State'

import {squareKeyDown, squareMouseDown, squareMouseUp, squareBlur} from '../actions/ActionCreator'

export type SquareProps = SquareOwnProps & SquareStateProps & SquareDispatchProps

type SquareOwnProps =  {
  index: number;
}
type SquareStateProps = {
  isActive: boolean;
  letter?: string;
  modifier: Modifier;
  direction: Direction;
}; 
type SquareDispatchProps = {
  onMouseUp: () => void;
  onMouseDown: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  onBlur: () => void;
}; 

const mapStateToProps = (state: AppState, props: SquareOwnProps) => {
  return {
    isActive: state.board.activeIndex === props.index && state.board.focusedIndex == props.index,
    letter: state.board.squares[props.index].letter,
    modifier: state.board.squares[props.index].modifier,
    direction: state.board.squares[props.index].direction,
  }
};
const mapDispatchToProps = (dispatch: Dispatch<AppAction>, props: SquareOwnProps) => {
  return {
    onMouseUp: () => dispatch(squareMouseUp()),
    onMouseDown: () => dispatch(squareMouseDown(props.index)),
    onKeyDown: (event: React.KeyboardEvent) => dispatch(squareKeyDown(props.index, event.key, event.shiftKey)),
    onBlur: (event: React.FocusEvent) =>  {
     const index: number = parseInt(event.currentTarget.getAttribute('data-index'));
     dispatch(squareBlur(index)) 
    }
  }
};

function Square(props: SquareProps){
  return <SquareView {...props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Square);