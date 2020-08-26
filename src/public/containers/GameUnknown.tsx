import React, {Dispatch} from 'react'
import { connect } from 'react-redux';

import {AppAction} from '../actions/Actions';

import { AppState, RequestStatus} from '../store/State';
import GameUnknownView from '../views/GameUnknownView'
import {inputKeyDown, updateName, updateGameId, createGame, joinGame} from '../actions/ActionCreator'

export type GameUnknownProps = GameUnknownStateProps & GameUnknownDispatchProps;

type GameUnknownStateProps = {
  name: string,
  gameId : string,
  errorMessage: string,
  isLoading: boolean,
  isSuccessful: boolean,
  isError: boolean,
}
type GameUnknownDispatchProps = {
  inputKeyUp: (event: React.KeyboardEvent) => void;
  updateName: (event: React.ChangeEvent) => void,
  updateGameId: (event: React.ChangeEvent) => void,
  clickCreate: () => void;
  clickJoin: () => void;
}; 

const GameUnknown = (props: GameUnknownProps): JSX.Element => {
  return <GameUnknownView {...props}/>
}


const mapStateToProps = (appState : AppState): GameUnknownStateProps => {
  return {
    gameId: appState.input.gameId, 
    name: appState.input.name,
    errorMessage: appState.service.gameUnknown.error &&  appState.service.gameUnknown.error.message || null,
    isLoading: appState.service.gameUnknown.status === RequestStatus.REQUESTING, 
    isSuccessful: appState.service.gameUnknown.status === RequestStatus.SUCCESSFUL,
    isError: appState.service.gameUnknown.status === RequestStatus.ERRORED,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>): GameUnknownDispatchProps => {
  //The Keydown might need to be keyup if last letter goes missing
  return {
    inputKeyUp: (event: React.KeyboardEvent<Element>) => {
     const isCreate: boolean = event.currentTarget.id === "createName";
     dispatch(inputKeyDown(event.key, isCreate)) 
    },
    updateName: (event: React.ChangeEvent<HTMLInputElement>) => dispatch(updateName(event.target.value)),
    updateGameId: (event: React.ChangeEvent<HTMLInputElement>) => dispatch(updateGameId(event.target.value)),
    clickCreate: () => dispatch(createGame()),
    clickJoin: () => dispatch(joinGame()),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameUnknown)