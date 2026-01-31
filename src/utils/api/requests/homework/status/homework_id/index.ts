import { api } from '@/utils/api/instance';

type PostHomeworkStatusParams = Omit<ScheduleHomeworkElement, 'subjectName' | 'homeworkText' | 'files'>;

export type PostHomeworkStatusConfig = AxiosRequestConfig<PostHomeworkStatusParams>;

export const postHomeworkStatus = async ({ params, config }: PostHomeworkStatusConfig) =>
  api.post<PostHomeworkStatusResponse>(`/homework/status/${params.homeworkID}`, params, config);
