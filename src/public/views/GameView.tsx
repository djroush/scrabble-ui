import React from 'react';

import '../css/Game.css';

import {GameStatus} from '../store/State';
import {GameProps} from '../containers/Game';
import GameActiveView from '../views/GameActiveView'
import GameUnknown from '../containers/GameUnknown'
import GamePending from '../containers/GamePending'


const GameView = (props: GameProps) => {
  const gameStatusView = getViewForStatus(props.status);
  return (
    <div className="game">
      {gameStatusView}
    </div>
  );

  function getViewForStatus(status: GameStatus): JSX.Element {
    switch(status) {
      case GameStatus.UNKNOWN: {
        return <GameUnknown/>;
      }
      case GameStatus.PENDING: {
        return <GamePending/>;
      }
      case GameStatus.ACTIVE: {
        return <GameActiveView/>;
      }
    }
  }
};

export default GameView;