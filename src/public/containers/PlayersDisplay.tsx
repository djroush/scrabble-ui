import React from 'react'
import { connect } from 'react-redux';

import { AppState, PlayerInfo } from '../store/State';
import PlayersDisplayView from '../components/PlayersDisplay'


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
    playersInfo: appState.players.info, 
    activePlayerIndex: appState.players.activePlayerIndex,
  }
}
export default connect(mapStateToProps)(PlayersDisplay)