import { postUserAuth, PostUserAuthConfig } from '@/utils/api/requests/user/auth';
import { deleteUserLogout, DeleteUserLogoutConfig } from '@/utils/api/requests/user/logout';
import { postUserRegister, PostUserRegisterConfig } from '@/utils/api/requests/user/register';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['PostUserRegister', 'PostUserAuth', 'GetUserConfig'],
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
    })
  })
});

export const { usePostRegisterMutation, usePostAuthMutation, useDeleteLogoutMutation } = userApi;
