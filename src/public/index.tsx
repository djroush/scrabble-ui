import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import scrabbleMiddleware from './middleware/ScrabbleMiddleware'
import sseMiddleware from './middleware/SseMiddleware'
import { createLogger } from 'redux-logger';

// import { createProxyMiddleware } from 'http-proxy-middleware'

import './index.css';

import {AppState} from './types/State';
import {AppAction} from './actions'
import AppReducer from './reducers/App';
import App from './containers/AppContainer';

const loggerMiddleware = createLogger();
const store: Store<AppState, AppAction> = createStore(AppReducer, 
  applyMiddleware(
    thunkMiddleware, 
    scrabbleMiddleware,
    sseMiddleware, 
    loggerMiddleware
))

const render = () => ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,  
  document.getElementById('root')
);

render();



// const proxyMiddleware = createProxyMiddleware('/api', {
//   target: 'http://localhost:8080',
//   ws: false,
//   pathRewrite: {
//     '^/api/scrabble': '/scrabble'
//   },
// });

// module.exports = function(app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'http://localhost:3080',
//       changeOrigin: true,
//     })
//   );
// };