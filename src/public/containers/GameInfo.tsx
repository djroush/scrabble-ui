import React, {Dispatch} from 'react'
import { connect } from 'react-redux';

import GameInfoView from '../views/GameInfoView';

import { AppState } from '../store/State';
import * as GameStatusHelper from '../helper/GameStatusHelper'
import { AppAction } from 'actions/Actions';
import { leaveGame, forfeitGame, newGame } from '../actions/ActionCreator'


export type GameInfoProps = GameInfoStateProps & GameInfoDispatchProps;

type GameInfoStateProps = {
  id: string;
  status: string;
}

type GameInfoDispatchProps = {
  clickLeaveGame: () => void,
  clickForfeitGame: () => void,
  clickNewGame: () => void,
}


function Game(props: GameInfoProps) {
  return <GameInfoView {...props}/>;
};

const mapStateToProps = (appState : AppState): GameInfoStateProps => {
  const status = GameStatusHelper.getStatusName(appState.game.status)
  return {
    id: appState.game.id,
    status: status  
  };
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>): GameInfoDispatchProps => {
  //The Keydown might need to be keyup if last letter goes missing
  return {
    clickLeaveGame: () => dispatch(leaveGame()),
    clickForfeitGame: () => dispatch(forfeitGame()),
    clickNewGame: () => dispatch(newGame()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);