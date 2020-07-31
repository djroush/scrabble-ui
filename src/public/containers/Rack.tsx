import React, {Dispatch} from 'react'
import { connect } from 'react-redux';

import {AppAction} from '../actions/Actions'
import { AppState } from '../store/State';
import RackView from '../views/Rack';


type RackStateProps = {
  letters: string[];
}; 
type RackDispatchProps = {
  onClick: () => void;
}; 
export type RackProps = RackStateProps & RackDispatchProps

const mapStateToProps = (state: AppState) => ({
    letters: state.rack.letters
})

const Rack = (props: RackProps) => {
  return (
    <RackView {...props} />
  );
}
const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => {
  return {
    onClick: () => {} //dispatch(rackClick()),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rack)

