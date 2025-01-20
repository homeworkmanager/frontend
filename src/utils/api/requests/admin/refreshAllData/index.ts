import { api } from '@/utils/api/instance';

export type PatchAdminRefreshAllDataConfig = AxiosRequestConfig | undefined;

export const patchAdminRefreshAllData = async (requestConfig?: PatchAdminRefreshAllDataConfig) =>
  api.patch<AdminRefreshAllDataResponse>('/admin/refreshAllData', requestConfig?.config);
