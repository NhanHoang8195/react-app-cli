import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { httpRequestMiddleWare } from '../middlewares';

const loggerMiddleWare = createLogger();

const store = createStore(rootReducer, applyMiddleware(thunk, loggerMiddleWare, httpRequestMiddleWare));

export default store;