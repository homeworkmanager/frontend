import { api } from '@/utils/api/instance';

export type GetAdminGroupsConfig = AxiosRequestConfig | undefined;

export const GetAdminGroups = async (requestConfig?: GetAdminGroupsConfig) =>
  api.get<AdminGroupsResponse>('/admin/groups', requestConfig?.config);
