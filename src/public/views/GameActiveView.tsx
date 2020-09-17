import React from 'react';

import '../styles/GameActiveStyle.css';

import PlayerActions from '../containers/PlayerActionsContainer';
import PlayersDisplay from '../containers/PlayersDisplayContainer';
import GameInfo from '../containers/GameInfoContainer' 
import Rack from '../containers/RackContainer';
import LastTurn from '../containers/LastTurnContainer';
import ExchangeLetters from '../containers/ExchangeContainer';
import { GameActiveProps } from 'containers/GameActiveContainer';
import SpinnerView from './SpinnerView';
import ErrorMessageView from './ErrorMessageView';

const GameActiveView = (props: GameActiveProps) => {
  const { isLoading, isError, errorMessage} = props
  return (
    <div className="gameActive">
         <div>
          <Rack/>
          <PlayerActions />
          <ExchangeLetters/>
        </div>
        <div>
          <LastTurn/>
         {isLoading ? <SpinnerView/> : ''}
         {isError ? <ErrorMessageView errorMessage={errorMessage}/> : ''}
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
