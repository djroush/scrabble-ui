import React from 'react'
import { connect } from 'react-redux';

import { AppState } from '../store/State';
import RackView from '../components/Rack';


type RackStateProps = {
  letters: string[];
}; 
export type RackProps = RackStateProps

const mapStateToProps = (state: AppState) => ({
    letters: state.rack.letters
})

const Rack = (props: RackProps) => {

  return (
    <RackView {...props} />
  );
}

export default connect(
  mapStateToProps,
)(Rack)

