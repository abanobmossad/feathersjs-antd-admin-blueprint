/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

// Enable redux dev tools chrome extension
// eslint-disable-next-line no-underscore-dangle

const devTools = process.env.NODE_ENV === 'development'
  && (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__());

const middlewareCompose = devTools
  ? compose(applyMiddleware(...middleware), devTools)
  : compose(applyMiddleware(...middleware));

const store = createStore(
  rootReducer,
  initialState,
  middlewareCompose,
);

export default store;
