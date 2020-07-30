import React, {Dispatch} from 'react'
import { connect } from 'react-redux';
import {AppAction} from '../actions/Actions'
import {exchangeKeyDown, returnExchangedLetter} from '../actions/ActionCreator'
import ExchangeView from '../components/ExchangeView';

import { AppState } from '../store/State';

export type ExchangeProps = ExchangeStateProps & ExchangeDispatchProps;

type ExchangeStateProps = {
  letters: string[];
}
type ExchangeDispatchProps = {
  onKeyPress: (event: React.KeyboardEvent) => void;
  onClick: (event: React.MouseEvent) => void;
}

function Exchange(props: ExchangeProps) {
  return <ExchangeView {...props}/>;
};

const mapStateToProps = (appState : AppState): ExchangeStateProps => {
  return {
    letters: appState.exchange.letters,
  }
}
const mapDispatchToProps = (dispatch: Dispatch<AppAction>): ExchangeDispatchProps => {
  return {
    onKeyPress: (event: React.KeyboardEvent) => {
      //TODO: fix this to take care of Backspace as well!
      const key = event.key === 'Space' ? ' ' : event.key.toUpperCase();
      dispatch(exchangeKeyDown(key))
    },
    onClick: (event: React.MouseEvent) => {
      const index: number = parseInt(event.currentTarget.getAttribute('data-index'));
      const letter: string = event.currentTarget.getAttribute('data-letter');
      dispatch(returnExchangedLetter(index, letter))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Exchange);