import React, {Dispatch} from 'react'
import { connect } from 'react-redux';

import {AppAction} from '../actions/Actions';

import { AppState,  } from '../store/State';
import GamePendingView from '../components/GamePendingView'
import {updateName, updateGameId, createGame, joinGame} from '../actions/ActionCreator'



export type GamePendingProps = GamePendingStateProps & GamePendingDispatchProps;

type GamePendingStateProps = {
  name: string,
  gameId : string,
}
type GamePendingDispatchProps = {
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
  //TODO: get the values from the view!
  return {
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