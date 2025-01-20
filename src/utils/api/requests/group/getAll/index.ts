import { api } from '@/utils/api/instance';

export type GetAllGroupsConfig = AxiosRequestConfig | undefined;

export const getAllGroups = async (requestConfig: GetAllGroupsConfig) =>
  api.get<AllGroupsResponse>('/group/getAll', requestConfig?.config);
