  import React, {useEffect} from 'react';

import '../css/App.css';

import Board from '../containers/Board';
import LetterDistributionView from '../views/LetterDistribution';
import Game from '../containers/Game'
import {AppProps} from '../containers/AppContainer' 

const AppView = (props: AppProps) => {
 
  useEffect(() => {
    const timerId = setInterval(() => props.onTimeout(), 5000);
    return () => {
      clearInterval(timerId);
    };
  });

  
  
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

export default AppView;
