import { getModeratorKey, GetModeratorKeyConfig } from '@/utils/api/requests/moderator/key/get';
import {
  patchModeratorKeyRegenerate,
  PatchModeratorKeyRegenerateConfig
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
    patchModeratorKeyRegenerate: builder.mutation({
      queryFn: ({ params, config }: PatchModeratorKeyRegenerateConfig) => patchModeratorKeyRegenerate({ params, config }),
      invalidatesTags: ['GetModeratorKey']
    })
  })
});

export const { useGetModeratorKeyQuery, usePatchModeratorKeyRegenerateMutation } = keyApi;
