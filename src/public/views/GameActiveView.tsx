import React from 'react';

import '../css/GameActive.css';

import PlayerActions from '../containers/PlayerActions';
import PlayersDisplay from '../containers/PlayersDisplay';
import GameInfo from '../containers/GameInfo' 
import Rack from '../containers/Rack';
import LastTurn from '../containers/LastTurn';
import ExchangeLetters from '../containers/Exchange';
import { GameActiveProps } from 'containers/GameActive';
import Spinner from './Spinner';
import ErrorMessageView from './ErrorMessage';

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
         {isLoading ? <Spinner/> : ''}
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
