import React from 'react';

import '../css/Actions.css';

type ActionsProps = {
/*  
  exchange: () => void,
  play: () => void,
  pass: () => void,
  challenge: () => void,
  forfeit: () => void
*/  
}

class Actions extends React.PureComponent<ActionsProps, unknown> {
  constructor(props: ActionsProps) {
    super(props);
  }

  render(): JSX.Element {
    
    return (
    <div className="actions">
        <button id="playButton" type="button">
          Play turn
        </button>
        <button id="exchangeButton" type="button">
          Exchange tiles
        </button>
        <button id="passButton" type="button">
          Pass turn
        </button>
        
        <button id="challengeButton" type="button">
          Challenge 
        </button>
        <button id="forfeitButton" type="button">
          Forfeit Game
        </button>

    </div>
    );
  }
}

Actions.prototype.state = {};

export default Actions;
