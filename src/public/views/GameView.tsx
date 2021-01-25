import React from 'react';

import '../styles/GameStyle.css';

import {GameStatus} from '../types/State';
import {GameProps} from '../containers/GameContainer';
import GameActive from '../containers/GameActiveContainer'
import GameFinishedView from '../views/GameFinishedView'
import GameAbortedView from '../views/GameAbortedView'
import GameUnknown from '../containers/GameUnknownContainer'
import GamePending from '../containers/GamePendingContainer'

const GameView = (props: GameProps) => {
  const getViewForStatus = (status: GameStatus): JSX.Element => {
    switch(status) {
      case GameStatus.UNKNOWN: {
        return <GameUnknown/>;
      }
      case GameStatus.PENDING: {
        return <GamePending/>;
      }
      case GameStatus.ACTIVE:
      case GameStatus.ENDGAME: {
        return <GameActive/>;
      }
      case GameStatus.ABORTED: {
        return <GameAbortedView/>;
      }
      case GameStatus.FINISHED: { 
        return <GameFinishedView/>;
      }
    }
  }
  const gameStatusView = getViewForStatus(props.status);
  return (
    <div className="game">
      {gameStatusView}
    </div>
  );
};

export default GameView;