import { axiosBaseQuery } from './axiosBaseQuery';
import { TAGS } from './constants/middlewareTags';
import { createApi } from '@reduxjs/toolkit/query/react';

export const middlewareSlice = createApi({
  tagTypes: Object.values(TAGS),
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({})
});
