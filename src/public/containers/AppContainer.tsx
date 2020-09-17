import React, {Dispatch} from 'react';
import { connect } from 'react-redux';

import AppView from '../views/AppView';
import { AppAction } from '../actions/SyncActions';
import {refreshGame} from '../actions/SyncActionCreator';

export type AppProps = AppStateProps & AppDispatchProps ;
export type AppStateProps = {}
export type AppDispatchProps = {
  onTimeout: () => void,
}
function App(props: AppProps) {
    return <AppView {...props} />
}
  
function mapStateToProps(): AppStateProps {
  return {}
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>): AppDispatchProps => {
  return {
    onTimeout: () => dispatch(refreshGame()),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);