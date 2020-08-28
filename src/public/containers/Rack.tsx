import React from 'react'
import { connect } from 'react-redux';

import { AppState, Tile } from '../store/State';
import RackView from '../views/Rack';


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

