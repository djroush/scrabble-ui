import React from 'react';;

import '../css/GameResult.css';

import {GameResultProps} from '../containers/GameResult';
import { PlayerInfo } from 'store/State';


const GameResultView = (props: GameResultProps) => {
  const {playersInfo} = props;

  const getWinner = (playersInfo: PlayerInfo[]) : PlayerInfo => {
    let maxScoreIndex : number = 0;
    let maxScore : number = -100;
    let needsTieBreaker : boolean = false;
    
    playersInfo.forEach((playerInfo: PlayerInfo, index: number) => {
      if (playerInfo.score > maxScore) {
        maxScore = playerInfo.score;
        maxScoreIndex = index;
        needsTieBreaker = false;
      } else if (playerInfo.score === maxScore) {
        needsTieBreaker = true;
      }  
    });
    if (needsTieBreaker) {
      //revert last turn scores
    }  
    return playersInfo[maxScoreIndex];
  };
  

  const winner: PlayerInfo = getWinner(playersInfo);
   
  return (
  <div className="gameResult">
    <h1>Congratulations <span>{winner.name}</span>!<br/>You've won this game.</h1>
  </div>
  );
  

}

export default GameResultView;
