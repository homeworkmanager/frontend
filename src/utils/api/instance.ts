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
    }
  }
);

api.defaults.withXSRFToken = true;
