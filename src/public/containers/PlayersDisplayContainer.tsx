import React from 'react'
import { connect } from 'react-redux';

import { AppState, PlayerInfo, GameStatus } from '../types/State';
import PlayersDisplayView from '../views/PlayersDisplayView';


export type PlayersDisplayProps = PlayersDisplayStateProps;

type PlayersDisplayStateProps = {
  playersInfo: PlayerInfo[], 
  activePlayerIndex: number,
  playerIndex: number,
  isGameActive: boolean
}

const PlayersDisplay = (props: PlayersDisplayProps): JSX.Element => {
  return <PlayersDisplayView {...props}/>
}

const mapStateToProps = (appState : AppState): PlayersDisplayStateProps => {
  return {
    playersInfo: appState.players, 
    activePlayerIndex: appState.game.activePlayerIndex,
    playerIndex: appState.game.playerIndex,
    isGameActive: appState.game.status === GameStatus.ACTIVE
  }
}
export default connect(mapStateToProps)(PlayersDisplay)