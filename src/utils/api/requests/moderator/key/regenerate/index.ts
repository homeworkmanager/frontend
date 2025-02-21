import { api } from '@/utils/api/instance';

export type GetModeratorKeyRegenerateConfig = AxiosRequestConfig;

export const getModeratorKeyRegenerate = async (requestConfig: GetModeratorKeyRegenerateConfig) =>
  api.get<ModeratorKeyGetResponse>('/moderator/key/regenerate', requestConfig?.config);
