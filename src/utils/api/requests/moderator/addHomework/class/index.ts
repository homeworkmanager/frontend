import { api } from '@/utils/api/instance';

export type PostmModeratorAddHomeworkClassParams = {
  classSemNumber: number;
  subjectId: number;
  Category: string;
  homeworkText: string;
  dueDate: string;
};

export type PostModeratorAddHomeworkClassConfig = AxiosRequestConfig<PostmModeratorAddHomeworkClassParams>;

export const postModeratorAddHomeworkClass = async ({ params, config }: PostModeratorAddHomeworkClassConfig) =>
  api.post<ModeratorAddHomeworkClassResponse>('/moderator/addHomework/class', params, config);
