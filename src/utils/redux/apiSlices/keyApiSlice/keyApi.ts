import { getModeratorKey, GetModeratorKeyConfig } from '@/utils/api/requests/moderator/key/get';
import {
  getModeratorKeyRegenerate,
  GetModeratorKeyRegenerateConfig
} from '@/utils/api/requests/moderator/key/regenerate';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const keyApi = createApi({
  reducerPath: 'keyApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['GetModeratorKey'],
  endpoints: (builder) => ({
    getModeratorKey: builder.query({
      queryFn: (requestConfig: GetModeratorKeyConfig) => getModeratorKey(requestConfig),
      providesTags: ['GetModeratorKey']
    }),
    getModeratorKeyRegenerate: builder.query({
      queryFn: (requestConfig: GetModeratorKeyRegenerateConfig) => getModeratorKeyRegenerate(requestConfig),
      providesTags: ['GetModeratorKey']
    })
  })
});

export const { useGetModeratorKeyQuery, useGetModeratorKeyRegenerateQuery } = keyApi;
