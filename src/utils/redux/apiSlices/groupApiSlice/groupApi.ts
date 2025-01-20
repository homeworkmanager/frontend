import { getAllGroups, GetAllGroupsConfig } from '@/utils/api/requests/group/getAll';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const groupApi = createApi({
  reducerPath: 'groupApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['GetAllGroupsConfig'],
  endpoints: (builder) => ({
    getAllGroups: builder.query<CurrentGroup[], GetAllGroupsConfig>({
      queryFn: (requestConfig?: GetAllGroupsConfig) => getAllGroups(requestConfig),
      providesTags: ['GetAllGroupsConfig']
    })
  })
});

export const { useGetAllGroupsQuery } = groupApi;
