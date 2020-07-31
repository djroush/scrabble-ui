import React, {Dispatch} from 'react'
import { connect } from 'react-redux';

import {AppAction} from '../actions/Actions'
import PlayerActionsView from '../views/PlayerActions'

import {shuffleLetters, returnPlayedLetters, returnExchangedLetters, exchangeLetters} from '../actions/ActionCreator'
import { AppState } from '../store/State';

export type PlayerActionsProps =  PlayerActionsStateProps & PlayerActionsDispatchProps;

type PlayerActionsStateProps = {
  hasPlayedLetters: boolean;
  hasExchangeLetters: boolean;
}

type PlayerActionsDispatchProps = {
  clickShuffle: () => void;
  clickReturn: () => void;
  clickExchange: () => void;
}; 

const mapStateToProps = (appState : AppState) => {
  return {
    hasPlayedLetters: appState.turn.tiles.length > 0,
    hasExchangeLetters: appState.exchange.letters.length > 0,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => {
  return {
    clickShuffle: () => dispatch(shuffleLetters()),
    clickReturn: () => {
      dispatch(returnPlayedLetters());
      dispatch(returnExchangedLetters()); 
    },
    clickExchange: () => dispatch(exchangeLetters()),
  }
};

function PlayerActions(props: PlayerActionsProps){
  return <PlayerActionsView {...props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerActions);