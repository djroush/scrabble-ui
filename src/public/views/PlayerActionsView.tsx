import React from 'react';

import '../css/PlayerActions.css';

import {PlayerActionsProps} from '../containers/PlayerActions'

const PlayerActionsView = (props: PlayerActionsProps) => {
  const {hasPlayedLetters, hasExchangeLetters, hasMultipleRackLetters, isPlayersTurn, wasPlayersTurn,
         clickShuffle, clickReturn, clickExchange, clickPlayTiles, clickPassTurn} = props;
  return (
  <div className="playerActions">
      {hasMultipleRackLetters
        ? <button id="shuffleButton" type="button" onClick={clickShuffle}>Shuffle tiles</button>
        : <button id="shuffleButton" type="button" disabled>Shuffle tiles</button>
      }
      {hasPlayedLetters  || hasExchangeLetters
        ? <button id="returnButton" type="button" title="Shift+Backspace" onClick={clickReturn}>Return tiles</button>
        : <button id="returnButton" type="button" title="Shift+Backspace" disabled >Return tiles</button>
      }
      {hasExchangeLetters
        ? <button id="exchangeButton" type="button" onClick={clickExchange}>Exchange tiles</button>
        : <button id="exchangeButton" type="button" disabled >Exchange tiles</button>
      }
      {hasPlayedLetters /* and is player's turn, need to setActiveIndex */
        ? <button id="playButton" type="button" onClick={clickPlayTiles}>Play tiles</button>
        : <button id="playButton" type="button" disabled>Play tiles</button>
      }
      {isPlayersTurn
        ? <button id="passButton" type="button" onClick={clickPassTurn}>Pass turn</button>
        : <button id="passButton" type="button" disabled>Pass turn</button>
      }
      {wasPlayersTurn
        ? <button id="challengeButton" type="button" disabled>Challenge</button>
        : <button id="challengeButton" type="button">Challenge</button>
      }

      
  </div>
  );
}

export default PlayerActionsView;
