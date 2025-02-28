import { api } from '@/utils/api/instance';

type PatchModeratorKeyRegenerateParams = {
  group_id: number;
};

export type PatchModeratorKeyRegenerateConfig = AxiosRequestConfig<PatchModeratorKeyRegenerateParams>;

export const patchModeratorKeyRegenerate = async ({ params, config }: PatchModeratorKeyRegenerateConfig) =>
  api.patch<ModeratorKeyRegenerateResponse>(`/moderator/key/regenerate/${params.group_id}`, config);
