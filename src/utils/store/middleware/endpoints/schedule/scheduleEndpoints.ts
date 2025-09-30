import { TAGS } from '../../constants/middlewareTags';
import { middlewareSlice } from '../../middlewareSlice';

import { patchAdminRefreshAllData, PatchAdminRefreshAllDataConfig } from '@/utils/api/requests/admin/refreshAllData';
import { PatchAdminUpdateClasses, patchAdminUpdateClasses } from '@/utils/api/requests/admin/updateClasses';
import { postHomeworkStatus, PostHomeworkStatusConfig } from '@/utils/api/requests/homework/status/homework_id';
import { postModeratorAddFile, PostModeratorAddFileConfig } from '@/utils/api/requests/moderator/addFile/homeworkId';
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
import { deleteModearatorFile, DeleteModeratorFileConfig } from '@/utils/api/requests/moderator/file/fileID';
import { patchModeratorHomework, PatchModeratorHomeworkConfig } from '@/utils/api/requests/moderator/update';
import { getNote } from '@/utils/api/requests/note';
import { getAllSchedule, GetAllScheduleConfig } from '@/utils/api/requests/schedule/get';
import { getScheduleHomework, GetScheduleHomeworkConfig } from '@/utils/api/requests/schedule/homeworks';
import { getSubjects, GetSubjectsConfig } from '@/utils/api/requests/subjects';
import { SCHEDULE_BEGIN } from '@/utils/constants/dates';
import { STORE_HOMEWORK, STORE_NOTES, STORE_SCHEDULE } from '@/utils/constants/dbStores';
import dbRepositories from '@/utils/db/UniHelper';
import { AxiosError } from 'axios';

export const scheduleEndpoints = middlewareSlice.injectEndpoints({
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
        } catch (error) {
          const cached = await scheduleRepo.get(scheduleCacheKey);

          if (cached) return { data: cached?.data };

          const err = error as AxiosError;
          return {
            error: {
              status: err.response?.status,
              data: err.response?.data || err.message
            }
          };
        }
      },
      providesTags: [TAGS.GET_ALL_SCHEDULE]
    }),
    patchAdminUpdateClasses: builder.mutation<AdminUpdateClassesResponse, PatchAdminUpdateClasses>({
      queryFn: (requestConfig?: PatchAdminUpdateClasses) => patchAdminUpdateClasses(requestConfig),
      invalidatesTags: [TAGS.GET_ALL_SCHEDULE]
    }),
    patchAdminRefreshAllData: builder.mutation<AdminRefreshAllDataResponse, PatchAdminRefreshAllDataConfig>({
      queryFn: (requestConfig?: PatchAdminRefreshAllDataConfig) => patchAdminRefreshAllData(requestConfig),
      invalidatesTags: [TAGS.GET_ALL_SCHEDULE, TAGS.GET_SCHEDULE_HOMEWORK, TAGS.GET_SUBJECTS]
    }),
    postModeratorAddHomeworkClass: builder.mutation({
      queryFn: ({ params, config }: PostModeratorAddHomeworkClassConfig) =>
        postModeratorAddHomeworkClass({ params, config }),
      invalidatesTags: [TAGS.GET_ALL_SCHEDULE, TAGS.GET_SCHEDULE_HOMEWORK]
    }),
    postModeratorAddHomeworkDate: builder.mutation({
      queryFn: ({ params, config }: PostModeratorAddHomeworkDateConfig) =>
        postModeratorAddHomeworkDate({ params, config }),
      invalidatesTags: [TAGS.GET_ALL_SCHEDULE, TAGS.GET_SCHEDULE_HOMEWORK]
    }),
    deleteModeratorHomework: builder.mutation({
      queryFn: ({ params, config }: DeleteModeratorHomeworkConfig) => deleteModeratorHomework({ params, config }),
      invalidatesTags: [TAGS.GET_ALL_SCHEDULE, TAGS.GET_SCHEDULE_HOMEWORK]
    }),
    patchModeratorHomework: builder.mutation({
      queryFn: ({ params, config }: PatchModeratorHomeworkConfig) => patchModeratorHomework({ params, config }),
      invalidatesTags: [TAGS.GET_ALL_SCHEDULE, TAGS.GET_SCHEDULE_HOMEWORK]
    }),
    postHomeworkStatus: builder.mutation({
      queryFn: ({ params, config }: PostHomeworkStatusConfig) => postHomeworkStatus({ params, config }),
      invalidatesTags: [TAGS.GET_ALL_SCHEDULE, TAGS.GET_SCHEDULE_HOMEWORK]
    }),
    postModeratorAddFile: builder.mutation({
      queryFn: ({ params, config }: PostModeratorAddFileConfig) => postModeratorAddFile({ params, config }),
      invalidatesTags: [TAGS.GET_ALL_SCHEDULE, TAGS.GET_SCHEDULE_HOMEWORK]
    }),
    deleteModeratorFile: builder.mutation({
      queryFn: ({ params, config }: DeleteModeratorFileConfig) => deleteModearatorFile({ params, config }),
      invalidatesTags: [TAGS.GET_ALL_SCHEDULE, TAGS.GET_SCHEDULE_HOMEWORK]
    }),
    getScheduleHomework: builder.query<ScheduleHomeworkResponse, GetScheduleHomeworkConfig>({
      async queryFn({ params, config }: GetScheduleHomeworkConfig) {
        const homeworkCacheKey = STORE_HOMEWORK;
        const homeworkRepo = await dbRepositories.homework;

        try {
          const homeworkResponse = await getScheduleHomework({ params, config });
          await homeworkRepo.set(homeworkCacheKey, homeworkResponse.data);

          return { data: homeworkResponse.data };
        } catch (error) {
          const cached = await homeworkRepo.get(homeworkCacheKey);

          if (cached) return { data: cached?.data };

          const err = error as AxiosError;
          return {
            error: {
              status: err.response?.status,
              data: err.response?.data || err.message
            }
          };
        }
      },
      providesTags: [TAGS.GET_SCHEDULE_HOMEWORK]
    }),
    getSubjects: builder.query<GetSubjectsResponse, GetSubjectsConfig>({
      queryFn: (requestConfig: GetSubjectsConfig) => getSubjects(requestConfig),
      providesTags: [TAGS.GET_SUBJECTS]
    })
  })
});

export const {
  useGetAllScheduleQuery,
  usePatchAdminUpdateClassesMutation,
  usePatchAdminRefreshAllDataMutation,
  usePostModeratorAddHomeworkClassMutation,
  usePostModeratorAddHomeworkDateMutation,
  usePostModeratorAddFileMutation,
  useDeleteModeratorFileMutation,
  useDeleteModeratorHomeworkMutation,
  usePatchModeratorHomeworkMutation,
  usePostHomeworkStatusMutation,
  useGetScheduleHomeworkQuery,
  useGetSubjectsQuery
} = scheduleEndpoints;
