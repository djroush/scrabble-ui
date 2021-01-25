import React from 'react';

import '../styles/PlayerActionsStyle.css';

import {PlayerActionsProps} from '../containers/PlayerActionsContainer'

const PlayerActionsView = (props: PlayerActionsProps) => {
  const { hasPlayedLetters, hasExchangeLetters, hasMultipleRackLetters, isPlayersTurn,
    isAwaitingChallenge, clickShuffle, clickReturn, clickExchange, clickPlayTiles, 
    clickPassTurn} = props;
  return (

  <div className="playerActions">
      {hasMultipleRackLetters
        ? <button id="shuffleButton" type="button" onClick={clickShuffle}>Shuffle tiles</button>
        : <button id="shuffleButton" type="button" disabled>Shuffle tiles</button>
      }
      {hasPlayedLetters || hasExchangeLetters
        ? <button id="returnButton" type="button" title="Shift+Backspace" onClick={clickReturn}>Return tiles</button>
        : <button id="returnButton" type="button" disabled>Return tiles</button>
      }
      {isPlayersTurn && isPlayersTurn && !isAwaitingChallenge
        ? <button id="passButton" type="button" onClick={clickPassTurn}>Pass turn</button>
        : <button id="passButton" type="button" disabled>Pass turn</button>
      }
      {hasExchangeLetters && isPlayersTurn && !isAwaitingChallenge
        ? <button id="exchangeButton" type="button" onClick={clickExchange}>Exchange tiles</button>
        : <button id="exchangeButton" type="button" disabled >Exchange tiles</button>
      }
      {hasPlayedLetters && isPlayersTurn && !isAwaitingChallenge
        ? <button id="playButton" type="button" onClick={clickPlayTiles}>Play tiles</button>
        : <button id="playButton" type="button" onClick={clickPlayTiles} disabled>Play tiles</button>
      }      
  </div>
  );
}

export default PlayerActionsView;
