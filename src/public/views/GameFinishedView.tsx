import React from 'react';

import  '../css/GameFinished.css';

import PlayersDisplay from '../containers/PlayersDisplay';
import GameFinishedResult from '../containers/GameFinishedResultContainer'
import GameInfo from '../containers/GameInfo' 

const GameFinishedView = () => {
  return (
    <div className="gameFinished">
        <GameFinishedResult/>
        <div>
          <PlayersDisplay/>
          <p/>
           <GameInfo />
        </div>
    </div>
  );
}
  
export default GameFinishedView;
