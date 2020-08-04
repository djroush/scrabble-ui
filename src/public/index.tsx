import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import apiMiddleware from './middleware/ScrabbleService'
import { createLogger } from 'redux-logger';

import './index.css';

import {AppState} from './store/State';
import {AppAction} from './actions/Actions'
import AppReducer from './reducers/App';
import App from './views/App';

const loggerMiddleware = createLogger();
const store: Store<AppState, AppAction> = createStore(AppReducer, applyMiddleware(thunkMiddleware,loggerMiddleware, 
apiMiddleware));

const render = () => ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,  
  document.getElementById('root')
);

render();
