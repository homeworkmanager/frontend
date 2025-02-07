import { api } from '@/utils/api/instance';

export type getAdminUsersConfig = AxiosRequestConfig | undefined;

export const getAdminUsers = async (requestConfig?: getAdminUsersConfig) =>
  api.get<AdminUsersResponse>('/admin/users', requestConfig?.config);
