import { api } from '@/utils/api/instance';

type DeleteModeratorHomeworkParams = { homeworkID: number };

export type DeleteModeratorHomeworkConfig = AxiosRequestConfig<DeleteModeratorHomeworkParams>;

export const deleteModeratorHomework = async ({ params, config }: DeleteModeratorHomeworkConfig) =>
  api.delete<ModeratorDeleteHomeworkResponse>(`/moderator/delete?homeworkId=${params.homeworkID}`, config);
