import React from 'react';

import '../css/PlayersDisplay.css';

import {PlayerState} from '../store/State';
import '../components/PlayersDisplay';; 

export type PlayersDisplayProps = {
  players: PlayerState[], 
  activePlayerIndex: number
}

 const PlayersDisplay = (props: PlayersDisplayProps) =>  {
  const {players, activePlayerIndex} = props;
  const playerHTML = !players ? "" :  players.map((player: PlayerState, index: number) => (
    <ul key={index} className={index == activePlayerIndex ? 'player active' : 'player'}>
      <li key="name">{player.name}</li>
      <li key="score">Score:&nbsp;{player.score}</li>
    </ul>
  ));
  
  return (
    <div className="playerDisplay">
      {playerHTML} 
    </div>
  );
}

//This is duplicated by the AppReducer state, remove this eventually after dispatching state
PlayersDisplay.defaultProps = {
  players: [
      {name: 'Rutherford',score:26},
      {name: 'Friedrich',score:18},
      {name: 'Sebastian',score:28},
      {name: 'Theodore',score:11}
    ], 
  activePlayerIndex: 0, 
};

export default PlayersDisplay;
