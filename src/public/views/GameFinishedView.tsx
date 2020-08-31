import React from 'react';

import  '../css/GameFinished.css';

import PlayersDisplay from '../containers/PlayersDisplay';
import GameResult from '../containers/GameResult'
import GameInfo from '../containers/GameInfo' 

const GameFinishedView = () => {
  return (
    <div className="gameFinished">
        <GameResult/>
        <div>
          <PlayersDisplay/>
          <p/>
           <GameInfo />
        </div>
    </div>
  );
}
  
export default GameFinishedView;
