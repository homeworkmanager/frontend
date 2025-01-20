import { api } from '@/utils/api/instance';

type GetAllScheduleParams = {
  from_time: string;
  days_count: number;
};

export type GetAllScheduleConfig = AxiosRequestConfig<GetAllScheduleParams>;

export const getAllSchedule = async ({ params, config }: GetAllScheduleConfig) =>
  api.get<AllScheduleResponse>(`/schedule/get?from_time=${params.from_time}&days_count=${params.days_count}`, config);
