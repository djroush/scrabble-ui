import React  from 'react'
import { connect } from 'react-redux';

import GameActiveView from '../views/GameActiveView';

import { AppState, RequestStatus } from '../types/State';

export type GameActiveProps = GameActiveStateProps;

type GameActiveStateProps = {
  errorMessage: string,
  isLoading: boolean,
  isError: boolean,
  isPlayersTurn: boolean;
  isAwaitingChallenge: boolean;


}

function GameActive(props: GameActiveProps) {
  return <GameActiveView {...props}/>;
};

const mapStateToProps = (appState : AppState): GameActiveStateProps => {
  return {
    errorMessage: appState.service.gameState.error &&  appState.service.gameState.error.message || null,
    isLoading: appState.service.gameState.status === RequestStatus.REQUESTING, 
    isError: appState.service.gameState.status === RequestStatus.ERRORED,
    isPlayersTurn: appState.game.isPlayerUp,
    isAwaitingChallenge: appState.lastTurn.state === 'AWAITING_CHALLENGE',
  };
}

export default connect(
  mapStateToProps,
)(GameActive);