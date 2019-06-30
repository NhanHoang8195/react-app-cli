import axios from 'axios';
import { HTTP } from '../constants';

/**
 * Return a promise that handled data from server.
 * @param options
 * @returns {Promise<Promise<AxiosResponse<T> | never>>}
 */
async function doRequest(options) {
  return axios.request(options).then(res => res.data);
}

/**
 * Middleware that handle all requests for the app.
 * @param store
 * @returns {function(*): Function}
 */
export const httpRequestMiddleWare = store => next => action => {
  // if type of payload is not http request, need dipatch action.
  if (!action[HTTP.HTTP_REQUEST]) {
      return next(action);
  }
  const { options } = action[HTTP.HTTP_REQUEST];
  const { handlers, ...requestOptions } = options;
  doRequest(requestOptions).then(data => {
    store.dispatch(handlers.success(data));
  }).catch(err => {
    store.dispatch(handlers.failure(err));
  });
  next(action);
};
