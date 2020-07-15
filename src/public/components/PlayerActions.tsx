import React from 'react';

import '../css/Actions.css';

/*  
  exchange: () => void,
  play: () => void,
  pass: () => void,
  challenge: () => void,
  forfeit: () => void
*/  


const PlayerActions = () => {
  return (
  <div className="actions">
      <button id="playButton" type="button">
        Play turn
      </button>
      <button id="exchangeButton" type="button">
        Exchange tiles
      </button>
      <button id="passButton" type="button">
        Pass turn
      </button>
      <button id="challengeButton" type="button">
        Challenge 
      </button>
      <button id="forfeitButton" type="button">
        Forfeit Game
      </button>

  </div>
  );
}

export default PlayerActions;
