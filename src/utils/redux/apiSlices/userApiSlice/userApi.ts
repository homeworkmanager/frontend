import { patchAdminRole,PatchAdminRoleConfig } from '@/utils/api/requests/admin/role/id';
import { getAdminUsers,GetAdminUsersConfig } from '@/utils/api/requests/admin/users';
import { postUserAuth, PostUserAuthConfig } from '@/utils/api/requests/user/auth';
import { deleteUserLogout, DeleteUserLogoutConfig } from '@/utils/api/requests/user/logout';
import { postUserRegister, PostUserRegisterConfig } from '@/utils/api/requests/user/register';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['PostUserRegister', 'PostUserAuth', 'GetUserConfig', 'GetAdminUsers'],
  endpoints: (builder) => ({
    postRegister: builder.mutation({
      queryFn: ({ params, config }: PostUserRegisterConfig) => postUserRegister({ params, config }),
      invalidatesTags: ['PostUserRegister']
    }),
    postAuth: builder.mutation({
      queryFn: ({ params, config }: PostUserAuthConfig) => postUserAuth({ params, config }),
      invalidatesTags: ['PostUserAuth']
    }),
    deleteLogout: builder.mutation({
      queryFn: (requestConfig?: DeleteUserLogoutConfig) => deleteUserLogout(requestConfig)
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

export const {
  usePostRegisterMutation,
  usePostAuthMutation,
  useDeleteLogoutMutation,
  useGetAdminUsersQuery,
  usePatchAdminRoleMutation
} = userApi;
