import React from 'react';

import '../css/Game.css';

import {GameStatus} from '../store/State';
import {GameProps} from '../containers/Game';
import GameActiveView from '../views/GameActiveView'
import GamePending from '../containers/GamePending'


const Game = (props: GameProps) => {
  const gameView = getViewForState(props.state);
  return (
    <div className="game">
      {gameView}
    </div>
  );

  function getViewForState(status: GameStatus): JSX.Element {
    switch(status) {
      case GameStatus.ACTIVE: {
        return <GameActiveView/>;
      }
      case GameStatus.UNKNOWN: {
        return <GamePending/>;
      }
    }
  }
};

export default Game;