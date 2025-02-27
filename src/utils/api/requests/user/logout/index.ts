import { api } from '@/utils/api/instance';

export const deleteUserLogout = async () => api.delete<UserLogoutResponse>('/user/logout');
