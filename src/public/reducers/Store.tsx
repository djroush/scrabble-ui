import { createStore } from 'redux';
import AppReducer from '../reducers/AppReducer';

const store = createStore(AppReducer); 

export type AppDispatch = typeof store.dispatch

export default store;