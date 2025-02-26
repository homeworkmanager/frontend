import { api } from '@/utils/api/instance';

export type PatchAdminKeysRegenerateConfig = AxiosRequestConfig | undefined;

export const patchAdminKeysRegenerate = async (requestConfig?: PatchAdminKeysRegenerateConfig) =>
  api.patch<AdminKeysRegenerateResponse>('/admin/keys/regenerate', requestConfig?.config);
