import { api } from '@/utils/api/instance';

export type GetUserConfig = AxiosRequestConfig | undefined;

export const getUserData = async (requestConfig?: GetUserConfig) =>
  api.get<GetUserResponse>('/user/get', requestConfig?.config);
