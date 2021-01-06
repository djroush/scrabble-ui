import React from 'react';;

import '../styles/GameFinishedResultStyle.css';

import {GameFinishedResultProps} from '../containers/GameFinishedResultContainer';
import { PlayerInfo } from '../types/State';


const GameFinishedResultView = (props: GameFinishedResultProps) => {
  const {playersInfo, winningPlayerIndex} = props;

  const winner: PlayerInfo = playersInfo[winningPlayerIndex];
   
  return (
  <div className="gameResult">
    <h1>Congratulations <span>{winner.name}</span>!<br/>You've won this game.</h1>
  </div>
  );
}

export default GameFinishedResultView;
