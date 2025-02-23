import { api } from '@/utils/api/instance';

export type GetModeratorKeyConfig = AxiosRequestConfig | undefined;

export const getModeratorKey = async (requestConfig?: GetModeratorKeyConfig) =>
  api.get<ModeratorKeyGetResponse>('/moderator/key/get', requestConfig?.config);
