import React, {Dispatch} from 'react'
import { connect } from 'react-redux';

import {AppAction} from '../actions/Actions'
import PlayerActionsView from '../components/PlayerActions'

import {shuffleLetters, returnLetters} from '../actions/ActionCreator'

export type PlayerActionsProps = PlayerActionsDispatchProps

type PlayerActionsDispatchProps = {
  clickShuffle: () => void;
  clickReturn: () => void;
}; 

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
  null,
  mapDispatchToProps
)(PlayerActions);