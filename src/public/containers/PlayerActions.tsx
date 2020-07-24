import React, {Dispatch} from 'react'
import { connect } from 'react-redux';

import {AppAction} from '../actions/Actions'
import PlayerActionsView from '../components/PlayerActions'

import {shuffleLetters} from '../actions/ActionCreator'

export type PlayerActionsProps = PlayerActionsDispatchProps

type PlayerActionsDispatchProps = {
  clickShuffle: () => void;
}; 

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => {
  return {
    clickShuffle: () => dispatch(shuffleLetters()),
//    clickPlay: () => dispatch(shuffleLetters()),
  }
};

function PlayerActions(props: PlayerActionsProps){
    return <PlayerActionsView {...props} />;
};


export default connect(
  null,
  mapDispatchToProps
)(PlayerActions);