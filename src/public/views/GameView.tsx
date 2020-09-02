import React from 'react';

import '../css/Game.css';

import {GameStatus} from '../store/State';
import {GameProps} from '../containers/Game';
import GameActive from '../containers/GameActive'
import GameFinishedView from '../views/GameFinishedView'
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
        return <GameActive/>;
      }
      //FIXME: This should really be the active view, need to implement logic for 
      // ENDGAME->FINISHED before changing this
      case GameStatus.ENDGAME:{ 
        return <GameFinishedView/>;
      } 
      case GameStatus.FINISHED: { 
        return <GameFinishedView/>;
      }
/*      case GameStatus.ABORTED: {
        return <GameAbortedView/>;
      }
      case GameStatus.ABANDONED: {
        return <GameAbandonedView/>;
      }
*/    }
  }
};

export default GameView;