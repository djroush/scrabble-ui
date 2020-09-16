import React from 'react';

import  '../css/GameAborted.css';

import PlayersDisplay from '../containers/PlayersDisplay';
import GameInfo from '../containers/GameInfo' 

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
