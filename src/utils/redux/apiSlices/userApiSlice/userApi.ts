import { postHomeworkStatus, PostHomeworkStatusConfig } from '@/utils/api/requests/homework/status/homework_id';
import { postUserAuth, PostUserAuthConfig } from '@/utils/api/requests/user/auth';
import { GetUserConfig, getUserData } from '@/utils/api/requests/user/get';
import { postUserRegister, PostUserRegisterConfig } from '@/utils/api/requests/user/register';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['PostUserRegister', 'PostUserAuth', 'GetUserConfig', 'PostHomeworkStatus'],
  endpoints: (builder) => ({
    postRegister: builder.mutation({
      queryFn: ({ params, config }: PostUserRegisterConfig) => postUserRegister({ params, config }),
      invalidatesTags: ['PostUserRegister']
    }),
    postAuth: builder.mutation({
      queryFn: ({ params, config }: PostUserAuthConfig) => postUserAuth({ params, config }),
      invalidatesTags: ['PostUserAuth']
    }),
    getUser: builder.query<GetUserResponse, GetUserConfig>({
      queryFn: (requestConfig: GetUserConfig) => getUserData(requestConfig),
      providesTags: ['GetUserConfig']
    }),
    postHomeworkStatus: builder.mutation({
      queryFn: ({ params, config }: PostHomeworkStatusConfig) => postHomeworkStatus({ params, config }),
      invalidatesTags: ['PostHomeworkStatus']
    })
  })
});

export const { usePostRegisterMutation, usePostAuthMutation, useGetUserQuery, usePostHomeworkStatusMutation } = userApi;
