import { Map } from 'immutable';
import {
    HOME_GET_DATA_START,
    HOME_GET_DATA_SUCCESS,
    HOME_GET_DATA_FAILURE,
} from './type';

const initialState = Map({
    data: null,
    isLoadingData: false,
    error: null,
});
const handlerMaps = {};

handlerMaps[HOME_GET_DATA_START] = (state) => {
  return state.set('isLoadingData', true);
};
handlerMaps[HOME_GET_DATA_SUCCESS] = (state, action) => {
  return state.set('isLoadingData', false).set('data', action.payload);
};
handlerMaps[HOME_GET_DATA_FAILURE] = (state, action) => {
  return state.set('isLoadingData', false).set('error', action.error);
};

export default (state = initialState, action) => {
  const fn = handlerMaps[action.type];
  return fn ? fn(state, action) : state;
};