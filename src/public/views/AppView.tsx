  import React, {useEffect} from 'react';

import '../styles/AppStyle.css';

import Board from '../containers/BoardContainer';
import LetterDistributionView from '../views/LetterDistributionView';
import Game from '../containers/GameContainer'
import {AppProps} from '../containers/AppContainer' 

const AppView = (props: AppProps) => {
  const {refreshGame} = props
  useEffect(() => {
    refreshGame();
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
