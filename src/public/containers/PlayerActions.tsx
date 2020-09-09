import React, {Dispatch} from 'react'
import { connect } from 'react-redux';

import {AppAction} from '../actions/Actions'
import PlayerActionsView from '../views/PlayerActionsView'

import {shuffleTiles, returnPlayedTiles, returnExchangedTiles, exchangeTiles, playTiles, passTurn, challengeTurn} from '../actions/ActionCreator'
import { AppState, GameStatus } from '../store/State';

export type PlayerActionsProps =  PlayerActionsStateProps & PlayerActionsDispatchProps;

type PlayerActionsStateProps = {
  hasPlayedLetters: boolean;
  hasExchangeLetters: boolean;
  hasMultipleRackLetters: boolean;
  isPlayersTurn: boolean;
  wasPlayersTurn: boolean;
  isActive: boolean;
  canChallenge: boolean;
}

type PlayerActionsDispatchProps = {
  clickShuffle: () => void;
  clickReturn: () => void;
  clickExchange: () => void;
  clickPlayTiles: () => void;
  clickPassTurn: () => void;
  clickChallengeTurn: () => void;
}; 

const mapStateToProps = (appState : AppState) => {
  const playerIndex: number = appState.game.playerIndex; 
  return {
    hasPlayedLetters: appState.turn.playedTiles.length > 0,
    hasExchangeLetters: appState.exchange.tiles.length > 0,
    hasMultipleRackLetters: appState.rack.tiles.length > 1,
    isPlayersTurn: appState.game.isPlayerUp,
    wasPlayersTurn: playerIndex === ((appState.lastTurn && appState.lastTurn.playerIndex) || -1) || !appState.lastTurn,
    isActive: appState.game.status === GameStatus.ACTIVE,
    canChallenge: appState.game.canChallenge
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => {
  return {
    clickShuffle: () => dispatch(shuffleTiles()),
    clickReturn: () => {
      dispatch(returnPlayedTiles());
      dispatch(returnExchangedTiles()); 
    },
    clickExchange: () => dispatch(exchangeTiles()),
    clickPlayTiles: () => dispatch(playTiles()),
    clickPassTurn: () => dispatch(passTurn()),
    clickChallengeTurn: () => dispatch(challengeTurn()),
  }
};

function PlayerActions(props: PlayerActionsProps){
  return <PlayerActionsView {...props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerActions);