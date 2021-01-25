import React, {Dispatch} from 'react'
import { connect } from 'react-redux';
import {AppAction} from '../actions/SyncActions'
import {exchangeKeyDown} from '../actions/SyncActionCreator'
import ExchangeView from '../views/ExchangeView';
import { AppState, Tile } from '../types/State';

export type ExchangeProps = ExchangeStateProps & ExchangeDispatchProps;

type ExchangeStateProps = {
  tiles: Tile[];
  isExchangeEmpty: boolean;
  isRackEmpty: boolean;
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
    isExchangeEmpty: appState.exchange.tiles.length === 0,
    isRackEmpty: appState.rack.tiles.length === 0,
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