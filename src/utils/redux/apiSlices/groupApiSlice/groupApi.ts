import { postAdminAddGroup, PostAdminAddGroupConfig } from '@/utils/api/requests/admin/addGroup';
import { GetAdminGroups, GetAdminGroupsConfig } from '@/utils/api/requests/admin/groups';
import { patchAdminKeysRegenerate, PatchAdminKeysRegenerateConfig } from '@/utils/api/requests/admin/keys/regenerate';
import { getAllGroups, GetAllGroupsConfig } from '@/utils/api/requests/group/getAll';
import { getModeratorKey, GetModeratorKeyConfig } from '@/utils/api/requests/moderator/key/get';
import {
  patchModeratorKeyRegenerate,
  PatchModeratorKeyRegenerateConfig
} from '@/utils/api/requests/moderator/key/regenerate';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const groupApi = createApi({
  reducerPath: 'groupApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['GetAllGroupsConfig', 'GetModeratorKey', 'Groups'],
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
      providesTags: ['Groups']
    }),
    postAdminAddGroup: builder.mutation({
      queryFn: ({ params, config }: PostAdminAddGroupConfig) => postAdminAddGroup({ params, config }),
      invalidatesTags: ['Groups']
    }),
    patchAdminKeysRegenerate: builder.mutation<AdminKeysRegenerateResponse, PatchAdminKeysRegenerateConfig>({
      queryFn: (requestConfig?: PatchAdminKeysRegenerateConfig) => patchAdminKeysRegenerate(requestConfig),
      invalidatesTags: ['Groups']
    })
  })
});

export const {
  useGetAllGroupsQuery,
  useGetModeratorKeyQuery,
  usePatchModeratorKeyRegenerateMutation,
  useGetAdminGroupsQuery,
  usePatchAdminKeysRegenerateMutation,
  usePostAdminAddGroupMutation
} = groupApi;
