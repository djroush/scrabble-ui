import React from 'react';

import '../css/Game.css';

import {GameStatus} from '../store/State';
import {GameProps} from '../containers/Game';
import GameActive from '../containers/GameActive'
import GameFinishedView from '../views/GameFinishedView'
import GameAbortedView from '../views/GameAbortedView'
import GameUnknown from '../containers/GameUnknown'
import GamePending from '../containers/GamePending'

const GameView = (props: GameProps) => {
  const getViewForStatus = (status: GameStatus): JSX.Element => {
    switch(status) {
      case GameStatus.UNKNOWN: {
        return <GameUnknown/>;
      }
      case GameStatus.PENDING: {
        return <GamePending/>;
      }
      case GameStatus.ENDGAME: {
        return <GameActive/>;
      }
      case GameStatus.ABORTED: {
        return <GameAbortedView/>;
      }
      case GameStatus.ACTIVE: {
        return <GameActive/>;
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