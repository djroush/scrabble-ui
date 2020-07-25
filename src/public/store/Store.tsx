import { createStore } from 'redux';
import AppReducer from '../reducers/App';
const store = createStore(AppReducer); 

export default store;