import React, {useEffect, useRef} from 'react';

import '../css/GamePending.css';

import Spinner from '../views/Spinner'
import type {GamePendingProps} from '../containers/GamePending'

const GamePendingView = (props: GamePendingProps) => {
  const gameIdInput = useRef(null);
  const joinNameInput = useRef(null);
  const createNameInput = useRef(null);
  
  useEffect(() => {
    if (props.name) {
      joinNameInput.current.value = props.name;
      createNameInput.current.value = props.name;
    }
    if (props.gameId) {
      gameIdInput.current.value = props.gameId;
    }
  });
  
  const {updateName, updateGameId, clickCreate, clickJoin, inputKeyUp, isLoading} = props;
  return (
    <div className="gamePending">
       <div> 
         <h3>Create a Game</h3>
         <div className="gameInputs"> 
           <span>Name: <input ref={createNameInput} id="createName" type="text" onChange={updateName} onKeyUp={inputKeyUp}></input></span>
           <button type="submit" onClick={clickCreate}>Create Game</button>
         </div>
      </div>
      <div>
        <h3>Join a Game</h3>
        <div className="gameInputs">
          <span>Name: <input ref={joinNameInput} id="joinName" type="text" onChange={updateName} onKeyUp={inputKeyUp}></input></span>
          <span>Game: <input ref={gameIdInput} id="joinGame" type="text" onChange={updateGameId} onKeyUp={inputKeyUp}></input></span>
          <button type="submit" onClick={clickJoin}>Join Game</button>
        </div>
      </div>
      {isLoading ? <Spinner/> : ''}
    </div>
  );
}
  
export default GamePendingView;
