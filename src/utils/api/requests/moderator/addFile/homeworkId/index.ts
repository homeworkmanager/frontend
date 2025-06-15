import { api } from '@/utils/api/instance';

interface PostModeratorAddFileParams {
  homeworkId: number;
  files: File[];
}

export type PostModeratorAddFileConfig = AxiosRequestConfig<PostModeratorAddFileParams>;

export const postModeratorAddFile = ({ params, config }: PostModeratorAddFileConfig) => {
  const formData = new FormData();
  params.files.forEach((file) => formData.append('files', file));

  return api.post<ModeratorAddFileResponse>(`/moderator/addFile/${params.homeworkId}`, formData, {
    ...config,
    headers: {
      ...config?.headers,
      'Content-Type': 'multipart/form-data'
    }
  });
};
