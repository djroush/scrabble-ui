import React, {Dispatch} from 'react'
import { connect } from 'react-redux';

import {AppAction} from '../actions/SyncActions'
import SquareView from '../views/SquareView'
import {AppState, Modifier, Direction, Tile} from '../types/State'

import {squareKeyDown, squareMouseDown, squareMouseUp} from '../actions/SyncActionCreator'

export type SquareProps = SquareOwnProps & SquareStateProps & SquareDispatchProps

type SquareOwnProps =  {
  index: number;
};
type SquareStateProps = {
  isActive: boolean;
  tile?: Tile;
  modifier: Modifier;
  direction: Direction;
  newTileIndexes: number[];
}; 
type SquareDispatchProps = {
  onMouseUp: () => void;
  onMouseDown: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
}; 

const mapStateToProps = (state: AppState, props: SquareOwnProps) => {
  const isActive = state.board.activeIndex === props.index && state.board.focusedIndex == props.index
  const {tile, modifier, direction} =  state.board.squares[props.index];
  const newTileIndexes: number[] = state.lastTurn && state.lastTurn.newTileIndexes || []

  return {
    isActive, tile, modifier, direction, newTileIndexes
  }
};
const mapDispatchToProps = (dispatch: Dispatch<AppAction>, props: SquareOwnProps) => {
  return {
    onMouseUp: () => dispatch(squareMouseUp()),
    onMouseDown: () => dispatch(squareMouseDown(props.index)),
    onKeyDown: (event: React.KeyboardEvent) => dispatch(squareKeyDown(props.index, event.key, event.shiftKey)),   
  }
};

function Square(props: SquareProps){
  return <SquareView {...props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Square);