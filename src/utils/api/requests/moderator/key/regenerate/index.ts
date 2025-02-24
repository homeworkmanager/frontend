import { api } from '@/utils/api/instance';

type PatchModeratorKeyRegenerateParams = {};

export type PatchModeratorKeyRegenerateConfig = AxiosRequestConfig<PatchModeratorKeyRegenerateParams>;

export const patchModeratorKeyRegenerate = async ({ params, config }: PatchModeratorKeyRegenerateConfig) =>
  api.patch<ModeratorKeyGetResponse>('/moderator/key/regenerate', params, config);
