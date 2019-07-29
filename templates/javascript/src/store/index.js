import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const loggerMiddleWare = createLogger();

const store = createStore(rootReducer, applyMiddleware(thunk, loggerMiddleWare));

export default store;
