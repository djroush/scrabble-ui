import React, {Dispatch} from 'react'
import { connect } from 'react-redux';

import {AppAction} from '../actions/Actions';

import { AppState,  } from '../store/State';
import GamePendingView from '../views/GamePendingView'
import {inputKeyDown, updateName, updateGameId, createGame, joinGame} from '../actions/ActionCreator'

export type GamePendingProps = GamePendingStateProps & GamePendingDispatchProps;

type GamePendingStateProps = {
  name: string,
  gameId : string,
}
type GamePendingDispatchProps = {
  inputKeyUp: (event: React.KeyboardEvent) => void;
  updateName: (event: React.ChangeEvent) => void,
  updateGameId: (event: React.ChangeEvent) => void,
  clickCreate: () => void;
  clickJoin: () => void;
}; 

const GamePending = (props: GamePendingProps): JSX.Element => {
  return <GamePendingView {...props}/>
}


const mapStateToProps = (appState : AppState): GamePendingStateProps => {
  return {
    gameId: appState.game.pending.gameId, 
    name: appState.game.pending.name, 
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>): GamePendingDispatchProps => {
  //The Keydown might need to be keyup if last letter goes missing
  return {
    inputKeyUp: (event: React.KeyboardEvent<Element>) => {
     const isCreate: boolean = event.currentTarget.id === "createName";
     dispatch(inputKeyDown(event.key, isCreate)) 
    },
    updateName: (event: React.ChangeEvent<HTMLInputElement>) => dispatch(updateName(event.target.value)),
    updateGameId: (event: React.ChangeEvent<HTMLInputElement>) => dispatch(updateGameId(event.target.value)),
    clickCreate: () => dispatch(createGame()),
    clickJoin: () => dispatch(joinGame()),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamePending)