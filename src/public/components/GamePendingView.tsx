import React, {useEffect, useRef} from 'react';

import '../css/GamePending.css';

import type {GamePendingProps} from '../containers/GamePendingView'

const GamePendingView = (props: GamePendingProps) => {
  const gameIdInput = useRef(null);
  const joinNameInput = useRef(null);
  const createNameInput = useRef(null);
  
  useEffect(() => {
    if (props.name) {
      joinNameInput.current.value = props.name;
      createNameInput.current.value = props.name;
    }
  });
  
  const {updateName, updateGameId, clickCreate, clickJoin} = props;
  return (
    <div className="gamePending">
       <div> 
         <h3>Create a Game</h3>
         <div className="gameInputs"> 
           <span>Name: <input ref={createNameInput} type="text" onChange={updateName}></input></span>
           <button type="submit" onClick={clickCreate}>Create Game</button>
         </div>
      </div>
      <div>
        <h3>Join a Game</h3>
        <div className="gameInputs">
          <span>Name: <input ref={joinNameInput} type="text" onChange={updateName}></input></span>
          <span>Game: <input ref={gameIdInput} type="text" onChange={updateGameId}></input></span>
          <button type="submit" onClick={clickJoin}>Join Game</button>
        </div>
      </div>
    </div>
  );
}
  
export default GamePendingView;
