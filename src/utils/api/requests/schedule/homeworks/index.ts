import { api } from '@/utils/api/instance';

type GetScheduleHomeworkParams = {
  from_time: string;
  days_count: number;
};

export type GetScheduleHomeworkConfig = AxiosRequestConfig<GetScheduleHomeworkParams>;

export const getScheduleHomework = async ({ params, config }: GetScheduleHomeworkConfig) =>
  api.get(`/schedule/homeworks?from_time=${params.from_time}&days_count=${params.days_count}`, config);
