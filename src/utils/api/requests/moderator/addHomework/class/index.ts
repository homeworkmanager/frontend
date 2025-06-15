import { api } from '@/utils/api/instance';

export type PostmModeratorAddHomeworkClassParams = {
  classSemNumber: number;
  subjectId: number;
  Category: string;
  homeworkText: string;
  dueDate: string;
  files?: File[];
};

export type PostModeratorAddHomeworkClassConfig = AxiosRequestConfig<PostmModeratorAddHomeworkClassParams>;

export const postModeratorAddHomeworkClass = async ({ params, config }: PostModeratorAddHomeworkClassConfig) => {
  const formData = new FormData();
  const { files, ...data } = params;

  formData.append('data', JSON.stringify(data));

  files?.forEach((file) => formData.append('files', file));

  return api.post<ModeratorAddHomeworkClassResponse>('/moderator/addHomework/class', formData, {
    ...config,
    headers: {
      ...config?.headers,
      'Content-Type': 'multipart/form-data'
    }
  });
};
