import { getAllSchedule, GetAllScheduleConfig } from '@/utils/api/requests/schedule/get';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const scheduleApi = createApi({
  reducerPath: 'scheduleApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['GetAllSchedule'],
  endpoints: (builder) => ({
    getAllSchedule: builder.query<AllScheduleResponse, GetAllScheduleConfig>({
      queryFn: ({ params, config }: GetAllScheduleConfig) => getAllSchedule({ params, config }),
      providesTags: ['GetAllSchedule']
    })
  })
});

export const { useGetAllScheduleQuery } = scheduleApi;
