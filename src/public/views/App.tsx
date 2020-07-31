import React from 'react';

import '../css/App.css';

import Board from '../containers/Board';
import LetterDistributionView from '../views/LetterDistribution';
import Game from '../containers/Game' 


/*
*/


const App = () => {
  return (
  <div className="App">
    <div className="left">
      <Game/>
    </div>
    <div className="mid">
      <Board/>
    </div>
    <div className="right">
      <LetterDistributionView/>
    </div>
  </div>
  );
};

export default App;
