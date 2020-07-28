import React from 'react';

import '../css/PlayersDisplay.css';

import {PlayersDisplayProps} from '../containers/PlayersDisplay'
import {PlayerInfo} from '../store/State'; 

 const PlayersDisplay = (props: PlayersDisplayProps) =>  {
  const {playersInfo, activePlayerIndex} = props;
  const playerHTML = !playersInfo ? "" :  playersInfo.map((playerInfo: PlayerInfo, index: number) => (
    <ul key={index} className={index == activePlayerIndex ? 'player active' : 'player'}>
      <li key="name">{playerInfo.name}</li>
      <li key="score">Score:&nbsp;{playerInfo.score}</li>
    </ul>
  ));
  
  return (
    <div className="playerDisplay">
      {playerHTML} 
    </div>
  );
}
export default PlayersDisplay;
