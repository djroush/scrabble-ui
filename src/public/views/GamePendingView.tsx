import React from 'react';

import '../css/GamePending.css';

import ErrorMessageView from '../views/ErrorMessage'
import Spinner from '../views/Spinner'

import {GamePendingProps} from '../containers/GamePending'
import { PlayerInfo } from 'store/State';

const GamePendingView = (props: GamePendingProps) => {
  const {hasMultiplePlayers, playersInfo, clickStart, isLoading, isError, errorMessage} = props;
   const playerHTML = !playersInfo ? "" :  playersInfo.map((playerInfo: PlayerInfo, index: number) => (
    <ul key={index}>
      <li key="name"><b>{playerInfo.name}</b></li>
    </ul>
  ));
  
  return (
    <div className="gamePending">
          {hasMultiplePlayers
              ? <h3>Begin a game by clicking the start button</h3>
              : <h3>Multiple players are needed before a game can start</h3>
          }
        <div><h4>Current players:</h4></div>
        <div>{playerHTML}</div>
        <div>
          {hasMultiplePlayers
            ? <button id="startButton" type="button" onClick={clickStart}>Start Game</button>
            : <button id="startButton" type="button" disabled>Start Game</button>
          }
        </div>
        {isLoading ? <Spinner/> : ''}
        {isError ? <ErrorMessageView errorMessage={errorMessage}/> : ''}

    </div>
  );
}
  
export default GamePendingView;
