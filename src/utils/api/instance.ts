import { UNIHELPER_DB_CONFIG } from '../configs/db.config';
import { COOKIE_KEY } from '../constants/cookie';
import { AUTH } from '../constants/routes';
import IndexedDBService from '../db/core';
import { deleteCookie } from '../services/deleteCookie';

import { routerNavigator } from '@/components/modules/Router/Navigator';
import axios, { AxiosError } from 'axios';

export const api = axios.create({
  withCredentials: true,
  baseURL: '/api',
  timeout: 8000,
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
      IndexedDBService.dropDataBase(UNIHELPER_DB_CONFIG);
      deleteCookie(COOKIE_KEY);
      routerNavigator.to(AUTH, { replace: true });
    }

    return Promise.reject(error);
  }
);

api.defaults.withXSRFToken = true;
