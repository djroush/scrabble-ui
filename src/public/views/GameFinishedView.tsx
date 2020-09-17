import React from 'react';

import  '../styles/GameFinishedStyle.css';

import PlayersDisplay from '../containers/PlayersDisplayContainer';
import GameFinishedResult from '../containers/GameFinishedResultContainer'
import GameInfo from '../containers/GameInfoContainer' 

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
