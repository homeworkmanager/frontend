import { api } from '@/utils/api/instance';

export type GetAdminUsersConfig = AxiosRequestConfig | undefined;

export const getAdminUsers = async (requestConfig?: GetAdminUsersConfig) =>
  api.get<AdminUsersResponse>('/admin/users', requestConfig?.config);
