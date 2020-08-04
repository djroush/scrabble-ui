import React from 'react'
import { connect } from 'react-redux';

import GameView from '../views/Game';

import { AppState, GameStatus } from '../store/State';

export type GameProps = GameStateProps;

type GameStateProps = {
  state: GameStatus;
}

//todo: get rid of GameView and just 
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