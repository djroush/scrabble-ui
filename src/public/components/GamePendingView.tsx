import React from 'react';

import '../css/GamePending.css';

const GamePendingView = () => {
  return (
    <div className="gamePending">
       <div> 
         <h3>Create a Game</h3>
         <div className="gameInputs"> 
           <span>Name: <input type="text"></input></span>
           <button type="submit">Create Game</button>
         </div>
      </div>
      <div>
        <h3>Join a Game</h3>
        <div className="gameInputs">
          <span>Name: <input type="text"></input></span>
          <span>Game: <input type="text"></input></span>
          <button type="submit">Join Game</button>
        </div>
      </div>
    </div>
  );
}
  
export default GamePendingView;
