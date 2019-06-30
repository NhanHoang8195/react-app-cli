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
function reducer(state = initialState, action) {
    switch (action.type) {
        case HOME_GET_DATA_START:
            return state.set('isLoadingData', true);
        case HOME_GET_DATA_SUCCESS:
            return state.set('isLoadingData', false).set('data', action.payload);
        case HOME_GET_DATA_FAILURE:
            return state.set('isLoadingData', false).set('error', action.error);
        default:
            return initialState;
    }
}

export default reducer;