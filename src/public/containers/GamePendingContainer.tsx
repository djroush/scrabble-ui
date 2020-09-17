import React, { Dispatch } from 'react'
import { connect } from 'react-redux';

import GamePendingView from '../views/GamePendingView';

import { AppState, RequestStatus, PlayerInfo } from '../types/State';
import {startGame} from '../actions/SyncActionCreator'
import { AppAction } from 'actions/SyncActions';

export type GamePendingProps = GamePendingStateProps & GamePendingDispatchProps;

type GamePendingStateProps = {
  hasMultiplePlayers: boolean,
  playersInfo: PlayerInfo[],
  errorMessage: string,
  isLoading: boolean,
  isSuccessful: boolean,
  isError: boolean,
}
type GamePendingDispatchProps = {
  clickStart: () => void,
}

function GamePending(props: GamePendingProps) {
  return <GamePendingView {...props}/>;
};

const mapStateToProps = (appState : AppState): GamePendingStateProps => {
  return {
    errorMessage: appState.service.gameState.error &&  appState.service.gameState.error.message || null,
    isLoading: appState.service.gameState.status === RequestStatus.REQUESTING, 
    isSuccessful: appState.service.gameState.status === RequestStatus.SUCCESSFUL,
    isError: appState.service.gameState.status === RequestStatus.ERRORED,
    hasMultiplePlayers: appState.players.length >= 2,
    playersInfo: appState.players
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