import React from 'react';

import '../css/App.css';

import PlayerActions from '../containers/PlayerActions';
import Board from '../components/Board';
import LetterDistributionView from '../components/LetterDistribution';
import PlayersDisplayView from '../components/PlayersDisplay' 
import Rack from '../containers/Rack';

const App = () => {
  return (
  <div className="App">
    <div className="left">
      <LetterDistributionView/>
    </div>
    <div className="mid">          
      <Rack />
      <PlayersDisplayView />
      <PlayerActions />
    </div>
    <div className="right">
    <Board/>
    </div>
  </div>
  );
};

export default App;
