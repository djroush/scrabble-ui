import React from 'react';

import '../styles/PlayerActionsStyle.css';

import {PlayerActionsProps} from '../containers/PlayerActionsContainer'

const PlayerActionsView = (props: PlayerActionsProps) => {
  const {hasPlayedLetters, hasExchangeLetters, hasMultipleRackLetters, isPlayersTurn, isActive,
         clickShuffle, clickReturn, clickExchange, clickPlayTiles, clickPassTurn} = props;
  return (
  <div className="playerActions">
      {hasMultipleRackLetters
        ? <button id="shuffleButton" type="button" onClick={clickShuffle}>Shuffle tiles</button>
        : <button id="shuffleButton" type="button" disabled>Shuffle tiles</button>
      }
      {hasPlayedLetters || hasExchangeLetters
        ? <button id="returnButton" type="button" title="Shift+Backspace" onClick={clickReturn}>Return tiles</button>
        : <button id="returnButton" type="button" title="Shift+Backspace" disabled >Return tiles</button>
      }
      {hasExchangeLetters && isActive && isPlayersTurn
        ? <button id="exchangeButton" type="button" onClick={clickExchange}>Exchange tiles</button>
        : <button id="exchangeButton" type="button" disabled >Exchange tiles</button>
      }
      {hasPlayedLetters && isActive && isPlayersTurn
        ? <button id="playButton" type="button" onClick={clickPlayTiles}>Play tiles</button>
        : <button id="passButton" type="button" onClick={clickPassTurn}>Pass turn</button>
      }      
  </div>
  );
}

export default PlayerActionsView;
