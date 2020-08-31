import React from 'react';

import '../css/GameInfo.css';

import {GameInfoProps} from '../containers/GameInfo'

const GameInfo = (props: GameInfoProps) => {
  const {id, status} = props
  return (
  <div className="gameInfo">
      <span><strong>Game: {id}</strong></span>
      <span><strong>Status: {status}</strong></span>
      <div>
        {status === 'ACTIVE' 
         ? <button id="forfeitButton" type="button">Forfeit&nbsp;Game</button> 
         : <button id="newGameButton" type="button">New&nbsp;Game</button>
        }
      </div>
  </div>
  );
};

export default GameInfo;