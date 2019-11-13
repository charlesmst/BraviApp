import axios from 'axios'
import _ from 'lodash'
const instance = axios.create({
  baseURL: 'https://localhost:5001/api/',
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