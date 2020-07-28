import React from 'react';

import '../css/GameInfo.css';

const GameInfo = () => {
  return (
  <div className="gameInfo">
      <span><strong>Game: GAME1</strong></span>
      <span><strong>Status: UNKNOWN</strong></span>
      <div>
        <button id="test" type="button">Forfeit&nbsp;Game</button>
      </div>
  </div>
  );
};

export default GameInfo;