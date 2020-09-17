import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import refreshMiddleware from './middleware/RefreshMiddleware'
import scrabbleMiddleware from './middleware/ScrabbleMiddleware'
import { createLogger } from 'redux-logger';

import './index.css';

import {AppState} from './types/State';
import {AppAction} from './actions/SyncActions'
import AppReducer from './reducers/App';
import App from './containers/AppContainer';

const loggerMiddleware = createLogger();
const store: Store<AppState, AppAction> = createStore(AppReducer, applyMiddleware(
  thunkMiddleware, 
  refreshMiddleware,
  scrabbleMiddleware,
  loggerMiddleware
))

const render = () => ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,  
  document.getElementById('root')
);

render();
