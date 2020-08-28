import React, {Dispatch} from 'react'
import { connect } from 'react-redux';
import {AppAction} from '../actions/Actions'
import {exchangeKeyDown, returnExchangedTile} from '../actions/ActionCreator'
import ExchangeView from '../views/ExchangeView';
import { AppState, Tile } from '../store/State';

export type ExchangeProps = ExchangeStateProps & ExchangeDispatchProps;

type ExchangeStateProps = {
  tiles: Tile[];
}
type ExchangeDispatchProps = {
  onKeyDown: (event: React.KeyboardEvent) => void;
  onClick: (event: React.MouseEvent) => void;
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
      //TODO: fix this to take care of Backspace as well!
      let key = event.key === 'Space' ? ' ' : event.key;
      key = key.length === 1 ? key.toUpperCase() : key;
      dispatch(exchangeKeyDown(key, event.shiftKey))
    },
    onClick: (event: React.MouseEvent) => {
      //FIXME: need to get a tile here instead of a letter!!!
      const letter: string = event.currentTarget.getAttribute('data-letter');
      const index: number = parseInt(event.currentTarget.getAttribute('data-index'));
      const isBlank: boolean = "true" == event.currentTarget.getAttribute('data-isBlank') ;
      const tile = {letter, isBlank}
      dispatch(returnExchangedTile(tile, index))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Exchange);