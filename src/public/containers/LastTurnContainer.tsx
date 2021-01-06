import React, {Dispatch} from 'react'
import { connect } from 'react-redux';

import {AppAction} from '../actions/SyncActions'
import {challengeTurn} from '../actions/SyncActionCreator'

import { AppState, LastTurnState, PlayerInfo } from '../types/State';
import LastTurnView from '../views/LastTurnView';

export type LastTurnProps = LastTurnStateProps & LastTurnDispatchProps;

type LastTurnStateProps = {
  lastTurn: LastTurnState;
  players: PlayerInfo[]; 
  playerIndex: number;
  canChallenge: boolean;
};

type LastTurnDispatchProps = {
  clickChallengeTurn: () => void;
  clickBypassChallenge: () => void;
}; 
 
const mapStateToProps = (state: AppState) => {
  return {
    lastTurn: state.lastTurn,
    players: state.players,
    playerIndex: state.game.playerIndex,
    canChallenge: state.game.canChallenge
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => {
  return {
    clickChallengeTurn: () => dispatch(challengeTurn(true)),
    clickBypassChallenge: () => dispatch(challengeTurn(false)),
  }
};

function LastTurn(props: LastTurnProps) {
  return <LastTurnView {...props} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(LastTurn)

