import React, {useEffect, useRef} from 'react';

import '../styles/LastTurnStyle.css';
import { LastTurnProps } from '../containers/LastTurnContainer'
import { LastTurnState, PlayerInfo } from '../types/State';

const LastTurnView = (props: LastTurnProps)  => {
  const lastTurnDiv = useRef(null);
  
  useEffect(() => {    
    lastTurnDiv.current.className = "lastTurn"
      setTimeout(function() { 
        const test = handleCallback.bind(props)
        test(props);
      }, 5000);
  });

  const handleCallback = function(oldProps: LastTurnProps) {
    if (!props.isAwaitingChallenge) {
      if (oldProps.version === props.version) {
        lastTurnDiv.current.className = "lastTurn hidden"
      }
    }
  };

  const {canChallenge, playerIndex,lastTurn, players, clickBypassChallenge, clickChallengeTurn} = props;
  const getMessage = (lastTurn: LastTurnState, players: PlayerInfo[]): string => {
    const playerName: string = players[lastTurn.playerIndex].name
                              
      switch (lastTurn.action) {
        case "PLAY_TILES": {
          const tileCount = lastTurn.newTileIndexes.length
          return playerName + " played " + tileCount + " tile" + (tileCount !== 1 ? "s" : "") + " and scored " + lastTurn.points + " points"; 
        }
        case "EXCHANGE_TILES": {
          return playerName + " used their turn to exchange tiles";
        } 
        case "FORFEIT_GAME": {
          return playerName + " has forfeited this game";
        } 
        case "PASS_TURN": {
          return playerName + " has passed their turn";
        }
        case "CHALLENGE_TURN": {
          const losingPlayerIndex: number = lastTurn.loseTurnPlayerIndex;
          const losingPlayerName : string = players[losingPlayerIndex].name
          if (lastTurn.loseTurnPlayerIndex === lastTurn.playerIndex) {
            return playerName + " challenged the previous turn and lost, " + losingPlayerName + " loses a turn";
          } else {
            return playerName + " challenged the previous turn and won, " + losingPlayerName + " loses a turn";
          }
        }
        default: return playerName + " did something...";
      }
  }
  
  const getOptionsDiv = (canChallenge: boolean, playerIndex: number, lastTurn: LastTurnState): JSX.Element => {
    var isChallengeAction: boolean = lastTurn.action === 'PLAY_TILES' && lastTurn.state === 'AWAITING_CHALLENGE';
    var showChallengeOption: boolean = canChallenge && playerIndex != lastTurn.playerIndex; 
    if (!isChallengeAction || !showChallengeOption) {
      return null;
    } else {
      return (   
      <div className="wordList">    
        <div> Do you wish to challenge any of these words: <br/>{wordList}</div>
        <div className="options">
          <button id="challengeTurn" type="button" onClick={clickChallengeTurn}>Challenge turn</button>
          <button id="byPassChallenge" type="button" onClick={clickBypassChallenge}>Bypass challenge</button>
        </div>
      </div>
      )

    }
  }
  
  const words = lastTurn.wordsPlayed || []
  const wordList = '[' + words.join(', ') + ']';
  const message: string = lastTurn && lastTurn.action !== 'GAME_STARTED' ? getMessage(lastTurn,players) 
      : 'A new game has been started, Good Luck!';
  const optionsDiv = getOptionsDiv(canChallenge, playerIndex, lastTurn);
  return (
  <div ref={lastTurnDiv} className="lastTurn">
    <div>{message}</div>
    {optionsDiv}
  </div>
  ); 
}

export default LastTurnView;

