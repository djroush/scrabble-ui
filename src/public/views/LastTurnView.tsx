import React from 'react';

import '../css/LastTurn.css';
import { TurnProps } from '../containers/LastTurn'
import { LastTurnState, PlayerInfo } from 'store/State';

const LastTurnView = (props: TurnProps)  => {
  const {lastTurn, players} = props;

  const getMessage = (lastTurn: LastTurnState, players: PlayerInfo[]): string => {
    const playerName: string = players[lastTurn.playerIndex].name
                              
      switch (lastTurn.action) {
        case "PLAY_TILES": {
          return playerName + " played their turn and scored " + lastTurn.points + " points"; 
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
          lastTurn.loseTurnPlayerIndex
          const losingPlayerName : string = players[lastTurn.loseTurnPlayerIndex].name
          if (lastTurn.loseTurnPlayerIndex === lastTurn.playerIndex) {
            return losingPlayerName + " challenged the previous turn and lost, " + losingPlayerName + " loses a turn";
          } else {
            return losingPlayerName + " challenged the previous turn and won, " + playerName + " loses a turn";
          }
        }
        default: return playerName + " did something...";
      }
        

  }
       
  
  const message: string = !!lastTurn && !!lastTurn.action ? getMessage(lastTurn,players) : '';
  return (
  <div className="lastTurn">
    <span>{message}</span>
  </div>
  );
  
}



export default LastTurnView;

