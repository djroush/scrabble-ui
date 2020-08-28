import React from 'react'
import { connect } from 'react-redux';

import { AppState, PlayerInfo } from '../store/State';
import PlayersDisplayView from '../views/PlayersDisplayView';


export type PlayersDisplayProps = PlayersDisplayStateProps;

type PlayersDisplayStateProps = {
  playersInfo: PlayerInfo[], 
  activePlayerIndex: number
}

const PlayersDisplay = (props: PlayersDisplayProps): JSX.Element => {
  return <PlayersDisplayView {...props}/>
}

const mapStateToProps = (appState : AppState): PlayersDisplayStateProps => {
  return {
    playersInfo: appState.players, 
    activePlayerIndex: appState.game.activePlayerIndex,
  }
}
export default connect(mapStateToProps)(PlayersDisplay)