import React from 'react';

import '../css/App.css';

import PlayerActions from '../components/PlayerActions';
import Board from '../components/Board';
import LetterDistribution from '../components/LetterDistribution';
import PlayersDisplay from '../components/PlayersDisplay' 
import Rack from '../containers/Rack';

const App = () => {
  return (
  <div className="App">
    <div className="left">
      <LetterDistribution/>
    </div>
    <div className="mid">          
      <Rack />
      <PlayersDisplay />
      <PlayerActions />
    </div>
    <div className="right">
    <Board/>
    </div>
  </div>
  );
};

export default App;
