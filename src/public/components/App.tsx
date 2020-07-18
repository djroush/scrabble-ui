import React from 'react';

import '../css/App.css';

import PlayerActions from '../components/PlayerActions';
import Board from '../components/Board';
import LetterDistribution from '../components/LetterDistribution';
import PlayersDisplay from '../components/PlayersDisplay' 
import Rack from '../components/Rack';

class App extends React.Component<unknown, unknown> {
  board: Board;

  constructor(props: unknown) {
    super(props);
  }
  
  render(): JSX.Element {
    return (
      <div className="App">
        <div className="left">
          <LetterDistribution/>
        </div>
        <div className="mid">          
          <Rack />
          <PlayersDisplay />
          <PlayerActions />
        </div>
        <div className="right">
        <Board
          ref={(node) => {
            this.board = node;
          }}
        />
        </div>
      </div>
    );
  }
}  

export default App;
