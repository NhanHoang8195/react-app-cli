// This file defines all methods relate to handle request to server. Ex: doRequest.
import axios from 'axios';

/**
 * Merge headers with default headers.
 * @param {object} headers which user has set.
 * @returns {object} Headers object.
 */
function setHeaders(headers) {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...headers,
  };
}

/**
 * This function send a request to the target server.
 * @param {object} config object. Look at: https://github.com/axios/axios#request-config
 * @returns {Promise<Promise<AxiosResponse<T>>>}
 */
export async function doRequest(config) {
  const headers = setHeaders(config.headers);
  return axios.request({ ...config, headers }).then(res => res.data);
}
