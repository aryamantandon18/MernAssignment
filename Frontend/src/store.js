// store.js
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {thunk} from "redux-thunk";
import promiseMiddleware from 'redux-promise';
import { UserReducer } from "./reducers/userReducer";

// Define your reducer
const reducer = combineReducers({
 user:UserReducer,
});

let initialState = {
 
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk, promiseMiddleware))
);

export default store;
