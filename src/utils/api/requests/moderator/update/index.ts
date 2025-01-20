import { api } from '@/utils/api/instance';

type PatchModeratorHomeworkParams = {
  homeworkID: number;
  homeworkText: string;
};

export type PatchModeratorHomeworkConfig = AxiosRequestConfig<PatchModeratorHomeworkParams>;

export const patchModeratorHomework = async ({ params, config }: PatchModeratorHomeworkConfig) =>
  api.patch<ModeratorUpdateResponse>('/moderator/update', params, config);
