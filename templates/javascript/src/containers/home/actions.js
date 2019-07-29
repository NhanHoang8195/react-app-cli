import {
  GET_LIST_USER_START,
  GET_LIST_USER_SUCCESS,
  GET_LIST_USER_FAILURE,
} from './type';
import { REQUEST_METHODS, API_URL, request } from '../../api';

/**
 * Handle action get data successfully.
 * @param {string} type of action.
 * @param {object} data. Data receive from  axios(res.data)
 * @returns {object} Object need to dispatch action success.
 */
function handleSuccess(type, data) {
  return {
    type,
    payload: data,
  };
}
/**
 * Handle action get data failure.
 * @param {string} type of action.
 * @param {object} error. Error.
 * @returns {object} Object need to dispatch action failure.
 */
function handleFailure(type, error) {
  return {
    type,
    error,
  };
}

/**
 * ActionCreators that return a function.
 * @returns {Function} the function that will be implement by redux-thunk.
 */
export function getListUser() {
  return (dispatch) => {
    const options = {
      url: API_URL.LIST_USER_URL,
      method: REQUEST_METHODS.GET,
    };
    dispatch({ type: GET_LIST_USER_START });
    request.doRequest(options)
      .then(data => {
        dispatch(handleSuccess(GET_LIST_USER_SUCCESS, data));
      })
      .catch(error => {
        dispatch(handleFailure(GET_LIST_USER_FAILURE, error));
      });
  };
}
