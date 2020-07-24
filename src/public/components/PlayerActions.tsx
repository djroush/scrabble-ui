import React from 'react';

import '../css/PlayerActions.css';

/*  
  shuffle: () => void,
  exchange: () => void,
  return; () => void,
  play: () => void,
  pass: () => void,
  challenge: () => void,
  forfeit: () => void
*/  

import {PlayerActionsProps} from '../containers/PlayerActions'

const PlayerActions = (props: PlayerActionsProps) => {
  const {clickShuffle} = props;
  return (
  <div className="playerActions">
      <button id="shuffleButton" type="button" onClick={clickShuffle}>
        Shuffle tiles
      </button>
      <button id="playButton" type="button">
        Play tiles
      </button>
      <button id="returnButton" type="button">
        Return tiles
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
