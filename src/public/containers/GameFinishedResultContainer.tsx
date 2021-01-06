import React from 'react'
import { connect } from 'react-redux';

import GameFinishedResultView from '../views/GameFinishedResultView';

import { AppState, PlayerInfo } from '../types/State';

export type GameFinishedResultProps = GameFinishedResultStateProps;

type GameFinishedResultStateProps = {
  playersInfo: PlayerInfo[],
  winningPlayerIndex: number,
}

function GameFinishedResult(props: GameFinishedResultProps) {
  return <GameFinishedResultView {...props}/>;
};

const mapStateToProps = (appState : AppState): GameFinishedResultStateProps => {
  return {
    playersInfo: appState.players,
    winningPlayerIndex: appState.game.winningPlayerIndex || 0,
  };
}

export default connect(mapStateToProps)(GameFinishedResult);