import React from 'react';

import '../css/Players.css';

import {PlayerState} from '../reducers/State'; 

type PlayersDisplayProps = {
  players: PlayerState[], 
  activePlayerIndex: number
}

 const PlayersDisplay = (props: PlayersDisplayProps) =>  {
  const {players, activePlayerIndex} = props;
  const playerHTML = !players ? "" :  players.map((player: PlayerState, index: number) => (
    <ul key={index} className={index == activePlayerIndex ? 'player active' : 'player'}>
      <li key="name">Name:&nbsp;{player.name}</li>
      <li key="score">Score:&nbsp;{player.score}</li>
    </ul>
  ));
  
  return (
    <div className="playerDisplay">
      {playerHTML} 
    </div>
  );
}

PlayersDisplay.defaultProps = {
  players: [
      {name: 'Dough',score:26},
      {name: 'Friedrich',score:18},
      {name: 'Sebastian',score:28},
      {name: 'Theodore',score:11}
    ], 
  activePlayerIndex: -1, 
};

export default PlayersDisplay;
