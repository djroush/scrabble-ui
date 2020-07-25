import React from 'react'
import { connect } from 'react-redux';

import { AppState } from '../store/State';
import RackView from '../components/Rack';


type RackOwnProps =  {}
type RackStateProps = {
  letters: string[];
}; 
export type RackProps = RackOwnProps & RackStateProps

const mapStateToProps = (state: AppState) => ({
    letters: state.rack.letters
})

class Rack extends React.Component<RackProps, unknown> {
  render() {
    return (
      <RackView
        letters={this.props.letters}
      />
    );
  }
}

export default connect(
  mapStateToProps,
)(Rack)

