import { api } from '@/utils/api/instance';

export type PostmModeratorAddHomeworkDateParams = {
  subjectId: number;
  homeworkText: string;
  dueDate: string;
  files?: File[];
};

export type PostModeratorAddHomeworkDateConfig = AxiosRequestConfig<PostmModeratorAddHomeworkDateParams>;

export const postModeratorAddHomeworkDate = async ({ params, config }: PostModeratorAddHomeworkDateConfig) => {
  const formData = new FormData();

  const { files, ...data } = params;

  formData.append('data', JSON.stringify(data));

  files?.forEach((file) => formData.append('files', file));

  return api.post<ModeratorAddHomeworkDateResponse>('/moderator/addHomework/date', formData, {
    ...config,
    headers: {
      ...config?.headers,
      'Content-Type': 'multipart/form-data'
    }
  });
};
