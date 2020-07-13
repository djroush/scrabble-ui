import React from 'react';
import '../css/App.css';

import Actions from '../components/Actions';
import Board from '../components/Board';
import LetterDistribution from '../components/LetterDistribution';
import Players from '../components/Players';
import Rack from '../components/Rack';

type AppProps = {
};

class App extends React.Component<AppProps, unknown> {
  board: Board;
  players: Players;  
  rack: Rack;
  actions: Actions;

  constructor(props: AppProps) {
    super(props);
  }
  
  
  
  render(): JSX.Element {
    return (
      <div className="App">
        <div className="left">
          <LetterDistribution/>
        </div>
        <div className="mid">          
          <Rack ref={(node) => {
              this.rack = node;
            }}
          />
          <Players ref={(node) => {
              this.players = node;
            }}
          />
          <Actions ref={(node) => {
              this.actions = node;
            }}
          />
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
