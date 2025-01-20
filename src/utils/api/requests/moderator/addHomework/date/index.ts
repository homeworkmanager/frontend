import { api } from '@/utils/api/instance';

export type PostmModeratorAddHomeworkDateParams = {
  subjectId: number;
  homeworkText: string;
  dueDate: string;
};

export type PostModeratorAddHomeworkDateConfig = AxiosRequestConfig<PostmModeratorAddHomeworkDateParams>;

export const postModeratorAddHomeworkDate = async ({ params, config }: PostModeratorAddHomeworkDateConfig) =>
  api.post<ModeratorAddHomeworkDateResponse>('/moderator/addHomework/date', params, config);
