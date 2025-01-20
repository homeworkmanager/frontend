import { api } from '@/utils/api/instance';

type deleteModeratorHomeworkParams = { homeworkID: number };

export type DeleteModeratorHomeworkConfig = AxiosRequestConfig<deleteModeratorHomeworkParams>;

export const deleteModeratorHomework = async ({ params, config }: DeleteModeratorHomeworkConfig) =>
  api.delete<ModeratorDeleteResponse>(`/moderator/delete?homeworkId=${params.homeworkID}`, config);
