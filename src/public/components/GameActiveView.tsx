import React from 'react';

import '../css/GameActive.css';

import PlayerActions from '../containers/PlayerActions';
import PlayersDisplayView from '../components/PlayersDisplay'
import GameInfo from '../components/GameInfo' 
import Rack from '../containers/Rack';

const GameActiveView = () => {
  return (
    <div className="gameActive">
         <div>
          <Rack/>
          <PlayerActions />
        </div>
        <div>
          <PlayersDisplayView />
          <p/>
           <GameInfo />
        </div>
    </div>
  );
}
  
export default GameActiveView;
