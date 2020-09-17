import React from 'react';

import '../styles/PlayersDisplayStyle.css';

import {PlayersDisplayProps} from '../containers/PlayersDisplayContainer';
import {PlayerInfo} from '../types/State'; 

//TODO: need to add skipTurnCount, forfeited icons
const PlayersDisplayView = (props: PlayersDisplayProps) =>  {
  const {playersInfo, activePlayerIndex, playerIndex, isGameActive} = props;
  const playerHTML = !playersInfo ? "" :  playersInfo.map((playerInfo: PlayerInfo, index: number) => {
    let playerClass = 'player';
    if (playerInfo.forfeited) {
      playerClass += ' forfeit';
    } else if (index === activePlayerIndex && isGameActive) {
      playerClass += ' active';
    }
    if (index === playerIndex) {
      playerClass += ' self';
    }
    return ( 
       <ul key={index} className={playerClass}>
         <li key="name"><b>{playerInfo.name}</b></li>
         <li key="score">Score:&nbsp;{playerInfo.score}</li>
       </ul>
    )
  });
  
  return (
    <div className="playerDisplay">
      {playerHTML} 
    </div>
  );
}

export default PlayersDisplayView;