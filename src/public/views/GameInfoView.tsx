import React from 'react';

import '../styles/GameInfoStyle.css';

import {GameInfoProps} from '../containers/GameInfoContainer'

const GameInfoView = (props: GameInfoProps) => {
  const {id, status, clickLeaveGame, clickForfeitGame, clickNewGame} = props
  
  const getButton = (status: string) : JSX.Element => {
  switch(status) {
    case 'PENDING':
      return <button id="leaveGamebutton" type="button" onClick={clickLeaveGame}>Leave&nbsp;Game</button>;
    case 'ABORTED':
    case 'ENDGAME':
    case 'FINISHED':
      return <button id="newGameButton" type="button" onClick={clickNewGame}>New&nbsp;Game</button>
    default:
      return <button id="forfeitButton" type="button" onClick={clickForfeitGame}>Forfeit&nbsp;Game</button>
    }
  }
  
  return (
  <div className="gameInfo">
      <span><strong>Game: {id}</strong></span>
      <span><strong>Status: {status}</strong></span>
      <div>
         {getButton(status)}
      </div>
  </div>
  );
  
  
};

export default GameInfoView;