import { api } from '@/utils/api/instance';

type PostHomeworkStatusParams = {
  status: boolean;
};

export type PostHomeworkStatusConfig = AxiosRequestConfig<PostHomeworkStatusParams>;

export const postHomeworkStatus = async ({ params, config }: PostHomeworkStatusConfig) =>
  api.post<PostHomeworkStatusResponse>('/homework/status', params, config);
