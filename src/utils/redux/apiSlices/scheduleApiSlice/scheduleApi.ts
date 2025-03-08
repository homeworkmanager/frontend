import { PatchAdminUpdateClasses, patchAdminUpdateClasses } from '@/utils/api/requests/admin/updateClasses';
import { postHomeworkStatus, PostHomeworkStatusConfig } from '@/utils/api/requests/homework/status/homework_id';
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
import { patchModeratorHomework, PatchModeratorHomeworkConfig } from '@/utils/api/requests/moderator/update';
import { getAllSchedule, GetAllScheduleConfig } from '@/utils/api/requests/schedule/get';
import { getSubjects, GetSubjectsConfig } from '@/utils/api/requests/subjects';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const scheduleApi = createApi({
  reducerPath: 'scheduleApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['GetAllSchedule', 'GetSubjects'],
  endpoints: (builder) => ({
    getAllSchedule: builder.query<AllScheduleResponse, GetAllScheduleConfig>({
      queryFn: ({ params, config }: GetAllScheduleConfig) => getAllSchedule({ params, config }),
      providesTags: ['GetAllSchedule']
    }),
    patchAdminUpdateClasses: builder.mutation<AdminUpdateClassesResponse, PatchAdminUpdateClasses>({
      queryFn: (requestConfig?: PatchAdminUpdateClasses) => patchAdminUpdateClasses(requestConfig),
      invalidatesTags: ['GetAllSchedule']
    }),
    postModeratorAddHomeworkClass: builder.mutation({
      queryFn: ({ params, config }: PostModeratorAddHomeworkClassConfig) =>
        postModeratorAddHomeworkClass({ params, config }),
      invalidatesTags: ['GetAllSchedule']
    }),
    postModeratorAddHomeworkDate: builder.mutation({
      queryFn: ({ params, config }: PostModeratorAddHomeworkDateConfig) =>
        postModeratorAddHomeworkDate({ params, config }),
      invalidatesTags: ['GetAllSchedule']
    }),
    deleteModeratorHomework: builder.mutation({
      queryFn: ({ params, config }: DeleteModeratorHomeworkConfig) => deleteModeratorHomework({ params, config }),
      invalidatesTags: ['GetAllSchedule']
    }),
    patchModeratorHomework: builder.mutation({
      queryFn: ({ params, config }: PatchModeratorHomeworkConfig) => patchModeratorHomework({ params, config }),
      invalidatesTags: ['GetAllSchedule']
    }),
    postHomeworkStatus: builder.mutation({
      queryFn: ({ params, config }: PostHomeworkStatusConfig) => postHomeworkStatus({ params, config }),
      invalidatesTags: ['GetAllSchedule']
    }),
    getSubjects: builder.query<GetSubjectsResponse, GetSubjectsConfig>({
      queryFn: (requestConfig: GetSubjectsConfig) => getSubjects(requestConfig),
      providesTags: ['GetSubjects']
    })
  })
});

export const {
  useGetAllScheduleQuery,
  usePatchAdminUpdateClassesMutation,
  usePostModeratorAddHomeworkClassMutation,
  usePostModeratorAddHomeworkDateMutation,
  useDeleteModeratorHomeworkMutation,
  usePatchModeratorHomeworkMutation,
  usePostHomeworkStatusMutation,
  useGetSubjectsQuery
} = scheduleApi;
