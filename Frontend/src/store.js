// store.js
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {thunk} from "redux-thunk";
import promiseMiddleware from 'redux-promise';
import { ImageReducer, UserReducer, getUserImages } from "./reducers/userReducer";

// Define your reducer
const reducer = combineReducers({
 user:UserReducer,
 ImageReducer:ImageReducer,
 getUserImages,
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
