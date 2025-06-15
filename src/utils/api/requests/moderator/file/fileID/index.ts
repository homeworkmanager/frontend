import { api } from '@/utils/api/instance';

type DeleteModeratorFileParams = { fileID: number };

export type DeleteModeratorFileConfig = AxiosRequestConfig<DeleteModeratorFileParams>;

export const deleteModearatorFile = async ({ params, config }: DeleteModeratorFileConfig) =>
  api.delete<ModeratorDeleteFileResponse>(`/moderator/file/${params.fileID}`, config);
