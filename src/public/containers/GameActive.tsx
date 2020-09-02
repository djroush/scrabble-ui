import React  from 'react'
import { connect } from 'react-redux';

import GameActiveView from '../views/GameActiveView';

import { AppState, RequestStatus } from '../store/State';

export type GameActiveProps = GameActiveStateProps;

type GameActiveStateProps = {
  errorMessage: string,
  isLoading: boolean,
  isError: boolean,
}

function GameActive(props: GameActiveProps) {
  return <GameActiveView {...props}/>;
};

const mapStateToProps = (appState : AppState): GameActiveStateProps => {
  return {
    errorMessage: appState.service.gameActive.error &&  appState.service.gameActive.error.message || null,
    isLoading: appState.service.gameActive.status === RequestStatus.REQUESTING, 
    isError: appState.service.gameActive.status === RequestStatus.ERRORED,
  };
}

export default connect(
  mapStateToProps,
)(GameActive);