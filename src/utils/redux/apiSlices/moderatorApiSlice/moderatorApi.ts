import {
  postModeratorAddHomeworkClass,
  PostModeratorAddHomeworkClassConfig
} from '@/utils/api/requests/moderator/addHomework/class';
import {
  postModeratorAddHomeworkDate,
  PostModeratorAddHomeworkDateConfig
} from '@/utils/api/requests/moderator/addHomework/date';
import {
  deleteModeratorHomework,
  DeleteModeratorHomeworkConfig
} from '@/utils/api/requests/moderator/delete/homeworkID';
import { getSubjects, GetSubjectsConfig } from '@/utils/api/requests/subjects';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const moderatorApi = createApi({
  reducerPath: 'moderatorApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['PostModeratorAddHomeworkClass', 'PostModeratorAddHomeworkDate', 'deleteModeratorHomework', 'GetSubjects'],
  endpoints: (builder) => ({
    postModeratorAddHomeworkClass: builder.mutation({
      queryFn: ({ params, config }: PostModeratorAddHomeworkClassConfig) =>
        postModeratorAddHomeworkClass({ params, config }),
      invalidatesTags: ['PostModeratorAddHomeworkClass']
    }),
    postModeratorAddHomeworkDate: builder.mutation({
      queryFn: ({ params, config }: PostModeratorAddHomeworkDateConfig) =>
        postModeratorAddHomeworkDate({ params, config }),
      invalidatesTags: ['PostModeratorAddHomeworkDate']
    }),
    deleteModeratorHomework: builder.mutation({
      queryFn: ({ params, config }: DeleteModeratorHomeworkConfig) => deleteModeratorHomework({ params, config }),
      invalidatesTags: ['deleteModeratorHomework']
    }),
    getSubjects: builder.query<GetSubjectsResponse, GetSubjectsConfig>({
      queryFn: (requestConfig: GetSubjectsConfig) => getSubjects(requestConfig),
      providesTags: ['GetSubjects']
    })
  })
});

export const {
  usePostModeratorAddHomeworkClassMutation,
  usePostModeratorAddHomeworkDateMutation,
  useDeleteModeratorHomeworkMutation,
  useGetSubjectsQuery
} = moderatorApi;
