import React from 'react'
import { connect } from 'react-redux';

import GameInfoView from '../views/GameInfo';

import { AppState, GameStatus } from '../store/State';

export type GameInfoProps = GameInfoStateProps;

type GameInfoStateProps = {
  id: string;
  status: string;
}

function Game(props: GameInfoProps) {
  return <GameInfoView {...props}/>;
};

const mapStateToProps = (appState : AppState): GameInfoStateProps => {
  const status = getStatusName(appState.game.status)
  return {
    id: appState.game.id,
    status: status  
  };
  
  function getStatusName(status: GameStatus): string {
    switch(status) {
      case GameStatus.UNKNOWN: {
        return 'UNKNOWN';
      }
      case GameStatus.PENDING: {
        return 'PENDING';
      }
      case GameStatus.ACTIVE: {
        return 'ACTIVE';
      }
    }
    return  "????";
  }

}

export default connect(
  mapStateToProps,
)(Game);