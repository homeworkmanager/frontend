import { patchAdminRefreshAllData, PatchAdminRefreshAllDataConfig } from '@/utils/api/requests/admin/refreshAllData';
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
import { getScheduleHomework, GetScheduleHomeworkConfig } from '@/utils/api/requests/schedule/homeworks';
import { getSubjects, GetSubjectsConfig } from '@/utils/api/requests/subjects';
import { STORE_HOMEWORK, STORE_NOTES, STORE_SCHEDULE } from '@/utils/configs/db.config';
import { SCHEDULE_BEGIN } from '@/utils/configs/time.config';
import dbRepositories from '@/utils/db/UniHelper';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const scheduleApi = createApi({
  reducerPath: 'scheduleApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['GetAllSchedule', 'GetScheduleHomework', 'GetSubjects'],
  endpoints: (builder) => ({
    getAllSchedule: builder.query<AllScheduleResponse, GetAllScheduleConfig>({
      async queryFn({ params, config }: GetAllScheduleConfig) {
        const scheduleCacheKey = STORE_SCHEDULE;
        const homeworkCacheKey = STORE_HOMEWORK;
        const noteCacheKey = STORE_NOTES;
        const scheduleRepo = await dbRepositories.schedule;
        const homeworkRepo = await dbRepositories.homework;
        const notesRepo = await dbRepositories.notes;

        try {
          const scheduleResponse = await getAllSchedule({ params, config });
          await scheduleRepo.set(scheduleCacheKey, scheduleResponse.data);

          const needInitialize =
            (await notesRepo.get(noteCacheKey)) === undefined ||
            (await homeworkRepo.get(homeworkCacheKey)) === undefined;

          if (needInitialize) {
            const noteResponse = await getNote({ config: config });
            await notesRepo.set(noteCacheKey, noteResponse.data);

            const homeworkResponse = await getScheduleHomework({
              params: { from_time: SCHEDULE_BEGIN.date, days_count: SCHEDULE_BEGIN.days },
              config
            });
            await homeworkRepo.set(homeworkCacheKey, homeworkResponse.data);
          }

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
    patchAdminRefreshAllData: builder.mutation<AdminRefreshAllDataResponse, PatchAdminRefreshAllDataConfig>({
      queryFn: (requestConfig?: PatchAdminRefreshAllDataConfig) => patchAdminRefreshAllData(requestConfig),
      invalidatesTags: ['GetAllSchedule', 'GetScheduleHomework', 'GetSubjects']
    }),
    postModeratorAddHomeworkClass: builder.mutation({
      queryFn: ({ params, config }: PostModeratorAddHomeworkClassConfig) =>
        postModeratorAddHomeworkClass({ params, config }),
      invalidatesTags: ['GetAllSchedule', 'GetScheduleHomework']
    }),
    postModeratorAddHomeworkDate: builder.mutation({
      queryFn: ({ params, config }: PostModeratorAddHomeworkDateConfig) =>
        postModeratorAddHomeworkDate({ params, config }),
      invalidatesTags: ['GetAllSchedule', 'GetScheduleHomework']
    }),
    deleteModeratorHomework: builder.mutation({
      queryFn: ({ params, config }: DeleteModeratorHomeworkConfig) => deleteModeratorHomework({ params, config }),
      invalidatesTags: ['GetAllSchedule', 'GetScheduleHomework']
    }),
    patchModeratorHomework: builder.mutation({
      queryFn: ({ params, config }: PatchModeratorHomeworkConfig) => patchModeratorHomework({ params, config }),
      invalidatesTags: ['GetAllSchedule', 'GetScheduleHomework']
    }),
    postHomeworkStatus: builder.mutation({
      queryFn: ({ params, config }: PostHomeworkStatusConfig) => postHomeworkStatus({ params, config }),
      invalidatesTags: ['GetAllSchedule', 'GetScheduleHomework']
    }),
    getScheduleHomework: builder.query<ScheduleHomeworkResponse, GetScheduleHomeworkConfig>({
      async queryFn({ params, config }: GetScheduleHomeworkConfig) {
        const homeworkCacheKey = STORE_HOMEWORK;
        const homeworkRepo = await dbRepositories.homework;

        try {
          const homeworkResponse = await getScheduleHomework({ params, config });
          await homeworkRepo.set(homeworkCacheKey, homeworkResponse.data);

          return { data: homeworkResponse.data };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          const cached = await homeworkRepo.get(homeworkCacheKey);

          if (cached) return { data: cached?.data };

          return {
            error: {
              status: error.response?.status,
              data: error.response?.data || error.message
            }
          };
        }
      },
      providesTags: ['GetScheduleHomework']
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
  usePatchAdminRefreshAllDataMutation,
  usePostModeratorAddHomeworkClassMutation,
  usePostModeratorAddHomeworkDateMutation,
  useDeleteModeratorHomeworkMutation,
  usePatchModeratorHomeworkMutation,
  usePostHomeworkStatusMutation,
  useGetScheduleHomeworkQuery,
  useGetSubjectsQuery
} = scheduleApi;
