import React from 'react';

import '../css/GameInfo.css';

import {GameInfoProps} from '../containers/GameInfo'

const GameInfo = (props: GameInfoProps) => {
  return (
  <div className="gameInfo">
      <span><strong>Game: {props.id}</strong></span>
      <span><strong>Status: {props.status}</strong></span>
      <div>
        <button id="test" type="button">Forfeit&nbsp;Game</button>
      </div>
  </div>
  );
};

export default GameInfo;