import { axiosBaseQuery } from '../axiosBaseQuery';

import { postAdminAddGroup, PostAdminAddGroupConfig } from '@/utils/api/requests/admin/addGroup';
import { GetAdminGroups, GetAdminGroupsConfig } from '@/utils/api/requests/admin/groups';
import { patchAdminKeysRegenerate, PatchAdminKeysRegenerateConfig } from '@/utils/api/requests/admin/keys/regenerate';
import { getAllGroups, GetAllGroupsConfig } from '@/utils/api/requests/group/getAll';
import { getModeratorKey, GetModeratorKeyConfig } from '@/utils/api/requests/moderator/key/get';
import {
  patchModeratorKeyRegenerate,
  PatchModeratorKeyRegenerateConfig
} from '@/utils/api/requests/moderator/key/regenerate';
import { createApi } from '@reduxjs/toolkit/query/react';

export const groupApi = createApi({
  reducerPath: 'groupApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['GetAllGroupsConfig', 'GetModeratorKey', 'GetAdminGroups'],
  endpoints: (builder) => ({
    getAllGroups: builder.query<CurrentGroup[], GetAllGroupsConfig>({
      queryFn: (requestConfig?: GetAllGroupsConfig) => getAllGroups(requestConfig),
      providesTags: ['GetAllGroupsConfig']
    }),
    getModeratorKey: builder.query({
      queryFn: (requestConfig: GetModeratorKeyConfig) => getModeratorKey(requestConfig),
      providesTags: ['GetModeratorKey']
    }),
    patchModeratorKeyRegenerate: builder.mutation({
      queryFn: ({ params, config }: PatchModeratorKeyRegenerateConfig) =>
        patchModeratorKeyRegenerate({ params, config }),
      invalidatesTags: ['GetModeratorKey']
    }),
    getAdminGroups: builder.query<AdminGroupsResponse, GetAdminGroupsConfig>({
      queryFn: (requestConfig?: GetAdminGroupsConfig) => GetAdminGroups(requestConfig),
      providesTags: ['GetAdminGroups']
    }),
    postAdminAddGroup: builder.mutation({
      queryFn: ({ params, config }: PostAdminAddGroupConfig) => postAdminAddGroup({ params, config }),
      invalidatesTags: ['GetAdminGroups']
    }),
    patchAdminKeysRegenerate: builder.mutation<AdminKeysRegenerateResponse, PatchAdminKeysRegenerateConfig>({
      queryFn: (requestConfig?: PatchAdminKeysRegenerateConfig) => patchAdminKeysRegenerate(requestConfig),
      invalidatesTags: ['GetAdminGroups']
    })
  })
});

export const {
  useLazyGetAllGroupsQuery,
  useGetModeratorKeyQuery,
  usePatchModeratorKeyRegenerateMutation,
  useGetAdminGroupsQuery,
  usePatchAdminKeysRegenerateMutation,
  usePostAdminAddGroupMutation
} = groupApi;
