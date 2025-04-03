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
import { getNote } from '@/utils/api/requests/note';
import { getAllSchedule, GetAllScheduleConfig } from '@/utils/api/requests/schedule/get';
import { getSubjects, GetSubjectsConfig } from '@/utils/api/requests/subjects';
import dbRepositories from '@/utils/db/UniHelper';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const scheduleApi = createApi({
  reducerPath: 'scheduleApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['GetAllSchedule', 'GetSubjects'],
  endpoints: (builder) => ({
    getAllSchedule: builder.query<AllScheduleResponse, GetAllScheduleConfig>({
      async queryFn({ params, config }: GetAllScheduleConfig) {
        const scheduleCacheKey = 'schedule';
        const noteCacheKey = 'schedule';
        const scheduleRepo = await dbRepositories.schedule;
        const notesRepo = await dbRepositories.notes;

        try {
          const scheduleResponse = await getAllSchedule({ params, config });

          await scheduleRepo.set(scheduleCacheKey, scheduleResponse.data);

          const noteResponse = await getNote({ config: config });

          await notesRepo.set(noteCacheKey, noteResponse.data);

          return { data: scheduleResponse.data };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          const cached = await scheduleRepo.get(scheduleCacheKey);

          if (cached) return { data: cached?.data };

          return {
            error: {
              status: error.response?.status,
              data: error.response?.data || error.message
            }
          };
        }
      },
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
