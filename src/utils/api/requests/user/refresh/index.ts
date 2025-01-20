import { api } from '@/utils/api/instance';

export type getUserRefreshConfig = AxiosRequestConfig | undefined;

export const getUserRefresh = async (requestConfig?: getUserRefreshConfig) =>
  api.get<UserRefreshResponse>('/user/refresh', requestConfig?.config);
