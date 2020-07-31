import React from 'react';

import '../css/Game.css';

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

  function getViewForState(state: string): JSX.Element {
    switch(state) {
      case 'ACTIVE': {
        return <GameActiveView/>;
      }
      case 'PENDING': {
        return <GamePending/>;
      }
    }
  }
};

export default Game;