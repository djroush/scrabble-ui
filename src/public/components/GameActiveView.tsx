import React from 'react';

import '../css/GameActive.css';

import PlayerActions from '../containers/PlayerActions';
import PlayersDisplay from '../containers/PlayersDisplay';
import GameInfo from '../containers/GameInfo' 
import Rack from '../containers/Rack';

const GameActiveView = () => {
  return (
    <div className="gameActive">
         <div>
          <Rack/>
          <PlayerActions />
        </div>
        <div>
          <PlayersDisplay/>
          <p/>
           <GameInfo />
        </div>
    </div>
  );
}
  
export default GameActiveView;
