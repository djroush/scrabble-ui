import React from 'react'
import { connect } from 'react-redux';

import GameView from '../components/Game';

import { AppState } from '../store/State';

export type GameProps = GameStateProps;

type GameStateProps = {
  state: string;
}

function Game(props: GameProps) {
  return <GameView {...props}/>;
};

const mapStateToProps = (appState : AppState): GameStateProps => {
  return {
    state: appState.game.status,  
  }
 
}

export default connect(
  mapStateToProps,
)(Game);