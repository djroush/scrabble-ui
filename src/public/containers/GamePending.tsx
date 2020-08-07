import React, { Dispatch } from 'react'
import { connect } from 'react-redux';

import GamePendingView from '../views/GamePendingView';

import { AppState, RequestStatus, PlayerInfo } from '../store/State';
import {startGame} from '../actions/ActionCreator'
import { AppAction } from 'actions/Actions';

export type GamePendingProps = GamePendingStateProps & GamePendingDispatchProps;

type GamePendingStateProps = {
  hasMultiplePlayers: boolean
  playersInfo: PlayerInfo[]
  errorMessage: string,
  isLoading: boolean,
  isSuccessful: boolean,
  isError: boolean,
}
type GamePendingDispatchProps = {
  clickStart: () => void
}

function GamePending(props: GamePendingProps) {
  return <GamePendingView {...props}/>;
};

const mapStateToProps = (appState : AppState): GamePendingStateProps => {
  return {
    errorMessage: appState.service.gamePending.error &&  appState.service.gamePending.error.message || null,
    isLoading: appState.service.gamePending.status === RequestStatus.REQUESTING, 
    isSuccessful: appState.service.gamePending.status === RequestStatus.SUCCESSFUL,
    isError: appState.service.gamePending.status === RequestStatus.ERRORED,
    hasMultiplePlayers: appState.players.info.length >= 2,
    playersInfo: appState.players.info
  };
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>): GamePendingDispatchProps => {
  //The Keydown might need to be keyup if last letter goes missing
  return {
    clickStart: () => dispatch(startGame()),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamePending);