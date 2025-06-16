import { api } from '@/utils/api/instance';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { AxiosError, AxiosRequestConfig } from 'axios';

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: api.defaults.baseURL! }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async ({ url, method, data, params }: any) => {
    try {
      const response = await api.request({
        url: baseUrl + url,
        method,
        data,
        params
      });
      return response;
    } catch (error) {
      const err = error as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message
        }
      };
    }
  };

export { axiosBaseQuery };
