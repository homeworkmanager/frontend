import { cookieKey } from '../configs/cookieNames.config';
import { deleteCookie } from '../helpers/deleteCookie';

import axios, { AxiosError } from 'axios';

export const api = axios.create({
  withCredentials: true,
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      deleteCookie(cookieKey);
      window.location.href = '/auth';
      return Promise.reject(error);
    }

    if (error.response?.status && error.response.status >= 500) {
      const networkError = new Error('Network Error');
      return Promise.reject(networkError);
    }

    return Promise.reject(error);
  }
);

api.defaults.withXSRFToken = true;
