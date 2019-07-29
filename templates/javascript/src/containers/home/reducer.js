import { Map } from 'immutable';
import {
  GET_LIST_USER_START,
  GET_LIST_USER_SUCCESS,
  GET_LIST_USER_FAILURE,
} from './type';

const initialState = Map({
  data: null,
  isLoadingData: false,
  error: null,
});
const handlerMaps = {};

handlerMaps[GET_LIST_USER_START] = (state) => {
  return state.set('isLoadingData', true);
};
handlerMaps[GET_LIST_USER_SUCCESS] = (state, action) => {
  return state.set('isLoadingData', false).set('data', action.payload);
};
handlerMaps[GET_LIST_USER_FAILURE] = (state, action) => {
  return state.set('isLoadingData', false).set('error', action.error);
};

export default (state = initialState, action) => {
  const fn = handlerMaps[action.type];
  return fn ? fn(state, action) : state;
};
