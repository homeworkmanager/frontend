import { api } from '@/utils/api/instance';

type PatchAdminRoleParams = {
  user_id: number;
  role: number;
};

export type PatchAdminRoleConfig = AxiosRequestConfig<PatchAdminRoleParams>;

export const patchAdminRole = async ({ params, config }: PatchAdminRoleConfig) =>
  api.patch<AdminRoleResponse>(`/admin/role/${params.user_id}`, { role: params.role }, config);
