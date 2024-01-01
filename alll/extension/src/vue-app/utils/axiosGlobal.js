import axios, {isCancel, AxiosError} from 'axios';
import {getCookie} from '@pages/helper'

const instance = axios.create({
  baseURL: 'http://localhost:8888/',
  timeout: 10000,
  headers: {'X-Custom-Header': 'foobar'}
});

instance.interceptors.request.use(
  (config) => {
    const token = getCookie('cookie_token');
    const auth = `Bearer ${token}`;
    config.headers.Authorization = auth;
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// instance.interceptors.response.use(function (response) {
//   if(response.config.url == API_LOGIN){

//   }
//   return response
// });

export default instance