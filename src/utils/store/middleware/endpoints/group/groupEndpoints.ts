import { TAGS } from '../../constants/middlewareTags';
import { middlewareSlice } from '../../middlewareSlice';

import { postAdminAddGroup, PostAdminAddGroupConfig } from '@/utils/api/requests/admin/addGroup';
import { GetAdminGroups, GetAdminGroupsConfig } from '@/utils/api/requests/admin/groups';
import { patchAdminKeysRegenerate, PatchAdminKeysRegenerateConfig } from '@/utils/api/requests/admin/keys/regenerate';
import { getAllGroups, GetAllGroupsConfig } from '@/utils/api/requests/group/getAll';
import { getModeratorKey, GetModeratorKeyConfig } from '@/utils/api/requests/moderator/key/get';
import {
  patchModeratorKeyRegenerate,
  PatchModeratorKeyRegenerateConfig
} from '@/utils/api/requests/moderator/key/regenerate';

export const groupEndpoints = middlewareSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllGroups: builder.query<CurrentGroup[], GetAllGroupsConfig>({
      queryFn: (requestConfig?: GetAllGroupsConfig) => getAllGroups(requestConfig),
      providesTags: [TAGS.GET_ALL_GROUPS_CONFIG]
    }),
    getModeratorKey: builder.query({
      queryFn: (requestConfig: GetModeratorKeyConfig) => getModeratorKey(requestConfig),
      providesTags: [TAGS.GET_MODERATOR_KEY]
    }),
    patchModeratorKeyRegenerate: builder.mutation({
      queryFn: ({ params, config }: PatchModeratorKeyRegenerateConfig) =>
        patchModeratorKeyRegenerate({ params, config }),
      invalidatesTags: [TAGS.GET_MODERATOR_KEY]
    }),
    getAdminGroups: builder.query<AdminGroupsResponse, GetAdminGroupsConfig>({
      queryFn: (requestConfig?: GetAdminGroupsConfig) => GetAdminGroups(requestConfig),
      providesTags: [TAGS.GET_ADMIN_GROUPS]
    }),
    postAdminAddGroup: builder.mutation({
      queryFn: ({ params, config }: PostAdminAddGroupConfig) => postAdminAddGroup({ params, config }),
      invalidatesTags: [TAGS.GET_ADMIN_GROUPS]
    }),
    patchAdminKeysRegenerate: builder.mutation<AdminKeysRegenerateResponse, PatchAdminKeysRegenerateConfig>({
      queryFn: (requestConfig?: PatchAdminKeysRegenerateConfig) => patchAdminKeysRegenerate(requestConfig),
      invalidatesTags: [TAGS.GET_ADMIN_GROUPS]
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
} = groupEndpoints;
