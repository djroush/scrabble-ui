import React, {Dispatch} from 'react'
import { connect } from 'react-redux';

import {AppAction} from '../actions/'
import PlayerActionsView from '../views/PlayerActionsView'

import {shuffleTiles, returnPlayedTiles, returnExchangedTiles, exchangeTiles, playTiles, passTurn} from '../actions/SyncActionCreator'
import { AppState } from '../types/State';

export type PlayerActionsProps =  PlayerActionsStateProps & PlayerActionsDispatchProps;

type PlayerActionsStateProps = {
  hasPlayedLetters: boolean;
  hasExchangeLetters: boolean;
  hasMultipleRackLetters: boolean;
  isPlayersTurn: boolean;
  isAwaitingChallenge: boolean;
}

type PlayerActionsDispatchProps = {
  clickShuffle: () => void;
  clickReturn: () => void;
  clickExchange: () => void;
  clickPlayTiles: () => void;
  clickPassTurn: () => void;
}; 

const mapStateToProps = (appState : AppState) => {
  return {
    hasPlayedLetters: appState.turn.playedTiles.length > 0,
    hasExchangeLetters: appState.exchange.tiles.length > 0,
    hasMultipleRackLetters: appState.rack.tiles.length > 1,
    isPlayersTurn: appState.game.isPlayerUp,
    isAwaitingChallenge: appState.lastTurn.state === 'AWAITING_CHALLENGE'
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
  }
};

function PlayerActions(props: PlayerActionsProps){
  return <PlayerActionsView {...props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerActions);