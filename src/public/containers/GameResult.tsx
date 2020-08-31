import React from 'react'
import { connect } from 'react-redux';

import GameResultView from '../views/GameResultView';

import { AppState, PlayerInfo } from '../store/State';

export type GameResultProps = GameResultStateProps;

type GameResultStateProps = {
  playersInfo: PlayerInfo[]
}

function GameResult(props: GameResultProps) {
  return <GameResultView {...props}/>;
};

const mapStateToProps = (appState : AppState): GameResultStateProps => {
  return {
    playersInfo: appState.players
  };
}

export default connect(mapStateToProps)(GameResult);