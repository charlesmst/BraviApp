import axios from 'axios'
import _ from 'lodash'
import config from './config';
const instance = axios.create({
  baseURL: config.apiUrl,
  timeout: 10000,
});
export default instance

export function filterApiErrorMessage(exception) {
  if (_.get(exception, "response.data.error")) {
    return _.get(exception, "response.data.error")
  } else if (exception.message) {
    return exception.message
  } else {
    return "An error has occured"
  }
}