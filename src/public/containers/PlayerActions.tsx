import React, {Dispatch} from 'react'
import { connect } from 'react-redux';

import {AppAction} from '../actions/Actions'
import PlayerActionsView from '../components/PlayerActions'

import {shuffleLetters, returnLetters} from '../actions/ActionCreator'
import { AppState } from '../store/State';

export type PlayerActionsProps =  PlayerActionsStateProps & PlayerActionsDispatchProps;

type PlayerActionsStateProps = {
  hasPlayedLetters: boolean;
}

type PlayerActionsDispatchProps = {
  clickShuffle: () => void;
  clickReturn: () => void;
}; 

const mapStateToProps = (appState : AppState) => {
  return {
    hasPlayedLetters: appState.turn.tiles.length > 0,  
  }
 
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => {
  return {
    clickShuffle: () => dispatch(shuffleLetters()),
    clickReturn: () => dispatch(returnLetters()),
  }
};

function PlayerActions(props: PlayerActionsProps){
    return <PlayerActionsView {...props} />;
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerActions);