import React from 'react';

import '../css/Game.css';

import {GameStatus} from '../store/State';
import {GameProps} from '../containers/Game';
import GameActiveView from '../views/GameActiveView'
import GameUnknown from '../containers/GameUnknown'


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
      //TODO: add a pending view
      case GameStatus.ACTIVE: {
        return <GameActiveView/>;
      }
    }
  }
};

export default GameView;