import { api } from '@/utils/api/instance';

export type DeleteUserLogoutConfig = AxiosRequestConfig | undefined;

export const deleteUserLogout = async (requestConfig?: DeleteUserLogoutConfig) =>
  api.delete<UserLogoutResponse>('/user/logout', requestConfig?.config);
