import { patchAdminRefreshAllData, PatchAdminRefreshAllDataConfig } from '@/utils/api/requests/admin/refreshAllData';
import { patchAdminRole, PatchAdminRoleConfig } from '@/utils/api/requests/admin/role/id';
import { getAdminUsers, GetAdminUsersConfig } from '@/utils/api/requests/admin/users';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['PatchAdminRefreshAllData', 'PatchAdminUpdateClasses', 'GetAdminUsers'],
  endpoints: (builder) => ({
    patchAdminRefreshAllData: builder.mutation<AdminRefreshAllDataResponse, PatchAdminRefreshAllDataConfig>({
      queryFn: (requestConfig?: PatchAdminRefreshAllDataConfig) => patchAdminRefreshAllData(requestConfig),
      invalidatesTags: ['PatchAdminRefreshAllData']
    }),
    getAdminUsers: builder.query<AdminUsersResponse, GetAdminUsersConfig>({
      queryFn: (requestConfig?: GetAdminUsersConfig) => getAdminUsers(requestConfig),
      providesTags: ['GetAdminUsers']
    }),
    patchAdminRole: builder.mutation<AdminRoleResponse, PatchAdminRoleConfig>({
      queryFn: ({ params, config }: PatchAdminRoleConfig) => patchAdminRole({ params, config }),
      invalidatesTags: ['GetAdminUsers']
    })
  })
});

export const { usePatchAdminRefreshAllDataMutation, useGetAdminUsersQuery, usePatchAdminRoleMutation } = adminApi;
