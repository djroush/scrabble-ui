import React from 'react';

import '../styles/GameActiveStyle.css';

import PlayerActions from '../containers/PlayerActionsContainer';
import PlayersDisplay from '../containers/PlayersDisplayContainer';
import GameInfo from '../containers/GameInfoContainer' 
import Rack from '../containers/RackContainer';
import LastTurn from '../containers/LastTurnContainer';
import ExchangeLetters from '../containers/ExchangeContainer';
import { GameActiveProps } from 'containers/GameActiveContainer';
import IdleActions from '../containers/IdleActionsContainer'
import SpinnerView from './SpinnerView';
import ErrorMessageView from './ErrorMessageView';

const GameActiveView = (props: GameActiveProps) => {
  const { isLoading, isPlayersTurn, isAwaitingChallenge, isError, errorMessage} = props
  return (
    <div className="gameActive">
         <div>
          <Rack/>
          <PlayerActions />
          <div id="activeActions">
            {isPlayersTurn && !isAwaitingChallenge ? 
            <ExchangeLetters/> : <IdleActions/>
            }
          </div> 
        </div>
        <div>
          <LastTurn/>
         {isLoading ? <SpinnerView/> : null}
         {isError ? <ErrorMessageView errorMessage={errorMessage}/> : null}
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
