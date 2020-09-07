import React, {Dispatch} from 'react'
import { connect } from 'react-redux';
import {AppAction} from '../actions/Actions'
import {exchangeKeyDown} from '../actions/ActionCreator'
import ExchangeView from '../views/ExchangeView';
import { AppState, Tile } from '../store/State';

export type ExchangeProps = ExchangeStateProps & ExchangeDispatchProps;

type ExchangeStateProps = {
  tiles: Tile[];
}
type ExchangeDispatchProps = {
  onKeyDown: (event: React.KeyboardEvent) => void;
}

function Exchange(props: ExchangeProps) {
  return <ExchangeView {...props}/>;
};

const mapStateToProps = (appState : AppState): ExchangeStateProps => {
  return {
    tiles: appState.exchange.tiles,
  }
}
const mapDispatchToProps = (dispatch: Dispatch<AppAction>): ExchangeDispatchProps => {
  return {
    onKeyDown: (event: React.KeyboardEvent) => {
      let key = event.key === 'Space' ? ' ' : event.key;
      key = key.length === 1 ? key.toUpperCase() : key;
      dispatch(exchangeKeyDown(key, event.shiftKey))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Exchange);