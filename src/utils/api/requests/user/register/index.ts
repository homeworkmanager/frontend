import { api } from '@/utils/api/instance';

export type PostUserRegisterParams = {
  name: string;
  surname: string;
  email: string;
  registerKey: string;
  password: string;
  groupId: number;
};

export type PostUserRegisterConfig = AxiosRequestConfig<PostUserRegisterParams>;

export const postUserRegister = async ({ params, config }: PostUserRegisterConfig) =>
  api.post<UserRegisterResponse>('/user/register', params, config);
