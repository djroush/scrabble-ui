import React, {Dispatch} from 'react'
import { connect } from 'react-redux';

import GameInfoView from '../views/GameInfoView';

import { AppState, GameStatus } from '../types/State';
import { AppAction } from '../actions';
import { leaveGame, forfeitGame, newGame } from '../actions/SyncActionCreator'


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

export const getStatusName = (status: GameStatus): string => {
  switch(status) {
    case GameStatus.PENDING: {
      return 'PENDING';
    }
    case GameStatus.ABANDONED: {
      return 'ABANDONED';
    }
    case GameStatus.ACTIVE: {
      return 'ACTIVE';
    }
    case GameStatus.ENDGAME: {
      return 'ENDGAME';
    }
    case GameStatus.FINISHED: {
      return 'FINISHED';
    }
    case GameStatus.ABORTED: {
      return 'ABORTED';
    }
  }
  return 'UNKNOWN';
}

const mapStateToProps = (appState : AppState): GameInfoStateProps => {
  const status = getStatusName(appState.game.status)
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