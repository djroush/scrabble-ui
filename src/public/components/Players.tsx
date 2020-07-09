import React from 'react';

import '../css/Players.css';

type Player = {
  name: string,
  score: number,
  active: boolean
}

type PlayerDisplayState = {
  players: Player[];
}

class PlayerDisplay extends React.PureComponent<unknown, PlayerDisplayState> {
  constructor(props: unknown) {
    super(props);
  }

  render(): JSX.Element {
    const {players} = this.state;
    const playerHTML = !players ? "" :  players.map((player: Player, index: number) => (
      <ul key={index} className={player.active ? 'player active' : 'player'}>
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
}

PlayerDisplay.prototype.state = {
  players: [
    {name: 'Dough',score:26,active:true},
    {name: 'Friedrich',score:18,active:false},
    {name: 'Sebastian',score:28,active:false},
    {name: 'Theodore',score:11,active:false}
  ]
}

export default PlayerDisplay;
