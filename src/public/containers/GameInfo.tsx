import React from 'react'
import { connect } from 'react-redux';

import GameInfoView from '../views/GameInfo';

import { AppState } from '../store/State';

export type GameInfoProps = GameInfoStateProps;

type GameInfoStateProps = {
  id: string;
  status: string;
}

function Game(props: GameInfoProps) {
  return <GameInfoView {...props}/>;
};

const mapStateToProps = (appState : AppState): GameInfoStateProps => {
  return {
    id: appState.game.gameId,
    status: appState.game.status  
  }
}

export default connect(
  mapStateToProps,
)(Game);