import React from 'react'
import { connect } from 'react-redux';

import { AppState } from '../store/State';
import RackView from '../components/Rack';

const mapStateToProps = (state: AppState) => (
  {
    letters: state.rack.letters
  }
)
/*
const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    playLetter: (letter: string, index: number) => dispatch(playRackLetter(letter, index)),
});
*/

export type RackProps = {
  letters: string[], 
}

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
  /* mapDispatchToProps */
)(Rack)

