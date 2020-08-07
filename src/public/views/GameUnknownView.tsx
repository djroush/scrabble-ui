import React, {useEffect, useRef} from 'react';

import '../css/GameUnknown.css';

import ErrorMessageView from '../views/ErrorMessage'
import Spinner from '../views/Spinner'

import type {GameUnknownProps} from '../containers/GameUnknown'

const GamePendingView = (props: GameUnknownProps) => {
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
  
  const {updateName, updateGameId, clickCreate, clickJoin, inputKeyUp, isLoading, isError, errorMessage} = props;
  return (
    <div className="gameUnknown">
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
      {isError ? <ErrorMessageView errorMessage={errorMessage}/> : ''}
    </div>
  );
}
  
export default GamePendingView;
