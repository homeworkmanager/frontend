import { logOut, userSlice } from '../../storeSlices/user/slice';
import { axiosBaseQuery } from '../axiosBaseQuery';
import { noteApi } from '../note';
import { scheduleApi } from '../schedule';

import { patchAdminRole, PatchAdminRoleConfig } from '@/utils/api/requests/admin/role/id';
import { getAdminUsers, GetAdminUsersConfig } from '@/utils/api/requests/admin/users';
import { postUserAuth, PostUserAuthConfig } from '@/utils/api/requests/user/auth';
import { getUserData } from '@/utils/api/requests/user/get';
import { deleteUserLogout, DeleteUserLogoutConfig } from '@/utils/api/requests/user/logout';
import { postUserRegister, PostUserRegisterConfig } from '@/utils/api/requests/user/register';
import { UNIHELPER_DB_CONFIG } from '@/utils/configs/db.config';
import { COOKIE_KEY } from '@/utils/constants/cookie';
import { STORE_USER } from '@/utils/constants/dbStores';
import { USER_ROLES } from '@/utils/constants/userRoles';
import IndexedDBService from '@/utils/db/core';
import dbRepositories from '@/utils/db/UniHelper';
import { deleteCookie } from '@/utils/services/deleteCookie';
import { createApi } from '@reduxjs/toolkit/query/react';
import { AxiosError } from 'axios';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['GetUserConfig', 'GetAdminUsers'],
  endpoints: (builder) => ({
    postRegister: builder.mutation({
      queryFn: ({ params, config }: PostUserRegisterConfig) => postUserRegister({ params, config })
    }),
    postAuth: builder.mutation<UserResponse, PostUserAuthConfig>({
      async queryFn({ params, config }: PostUserAuthConfig) {
        const cacheKey = STORE_USER;
        const userRepo = await dbRepositories.user;

        try {
          await postUserAuth({ params, config });
          const userResponse = await getUserData({ config });
          await userRepo.set(cacheKey, { ...userResponse.data, role: USER_ROLES.OFFLINE });

          return { data: userResponse.data };
        } catch (error) {
          const err = error as AxiosError;
          return {
            error: {
              status: err.response?.status,
              data: err.response?.data || err.message
            }
          };
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userSlice.actions.logIn(data));
        } catch {
          dispatch(
            userSlice.actions.logIn({ role: USER_ROLES.OFFLINE, name: '', surname: '', email: '', group_name: '' })
          );
        }
      }
    }),
    deleteLogout: builder.mutation({
      queryFn: (requestConfig?: DeleteUserLogoutConfig) => deleteUserLogout(requestConfig),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        if (!data.error) {
          deleteCookie(COOKIE_KEY);

          await IndexedDBService.dropDataBase(UNIHELPER_DB_CONFIG);
          dispatch(logOut());
          dispatch(scheduleApi.util.invalidateTags(['GetAllSchedule', 'GetScheduleHomework']));
          dispatch(noteApi.util.invalidateTags(['GetNote']));
        }
      }
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
