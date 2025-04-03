import { COOKIE_KEY } from '../configs/cookie.config';
import { UNIHELPER_DB_CONFIG } from '../configs/db.config';
import { AUTH } from '../configs/routes.config';
import IndexedDBService from '../db/core';
import { deleteCookie } from '../helpers/deleteCookie';

import { routerNavigator } from '@/components/modules/Router/Navigator';
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
      IndexedDBService.dropDataBase(UNIHELPER_DB_CONFIG);
      deleteCookie(COOKIE_KEY);
      routerNavigator.to(AUTH, { replace: true });
    }

    return Promise.reject(error);
  }
);

api.defaults.withXSRFToken = true;
