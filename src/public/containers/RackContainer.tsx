import React from 'react'
import { connect } from 'react-redux';

import { AppState, Tile } from '../types/State';
import RackView from '../views/RackView';


type RackStateProps = {
  tiles: Tile[];
}; 
export type RackProps = RackStateProps

const mapStateToProps = (state: AppState) => ({
    tiles: state.rack.tiles
})

const Rack = (props: RackProps) => {
  return (
    <RackView {...props} />
  );
}

export default connect(
  mapStateToProps
)(Rack)

