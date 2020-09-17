import React from 'react';

import  '../styles/GameAbortedStyle.css';

import PlayersDisplay from '../containers/PlayersDisplayContainer';
import GameInfo from '../containers/GameInfoContainer' 

const GameAbortedView = () => {
  return (
    <div className="gameAborted">
        <div className="gameResult">
          <h1>This game has been aborted after all other players have left</h1>
        </div>
        <div>
          <PlayersDisplay/>
          <p/>
           <GameInfo />
        </div>
    </div>
  );
}
  
export default GameAbortedView;
