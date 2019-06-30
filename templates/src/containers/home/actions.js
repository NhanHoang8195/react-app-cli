import {
    HOME_GET_DATA_START,
    HOME_GET_DATA_SUCCESS,
    HOME_GET_DATA_FAILURE,
} from './type';
import { HTTP, API_URL } from '../../constants';

/**
 * Handle action get data successfully.
 * @param {object} data. Data receive from  axios(res.data)
 * @returns {object} Object need to dispatch action success.
 */
function handleSuccess(data) {
  return {
    type: HOME_GET_DATA_SUCCESS,
    payload: data,
  }
}
/**
 * Handle action get data failure.
 * @param {object} error. Error.
 * @returns {object} Object need to dispatch action failure.
 */
function handleFailure(error) {
  return {
    type: HOME_GET_DATA_FAILURE,
    error,
  }
}

export function getData() {
    return (dispatch) => {
        const options = {
            url: API_URL.GET_HOME_PAGE_DATA_URL,
            method: HTTP.METHOD_GET,
            handlers: {
                success: handleSuccess,
                failure: handleFailure,
            }
        };
        dispatch({
            type: HOME_GET_DATA_START,
            [HTTP.HTTP_REQUEST]: {
                options
            }
        });
    };
}