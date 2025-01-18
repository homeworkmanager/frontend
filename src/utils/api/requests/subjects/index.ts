import { api } from '../../instance';

export type GetSubjectsConfig = AxiosRequestConfig | undefined;

export const getSubjects = async (requestConfig?: GetSubjectsConfig) =>
  api.get<GetSubjectsResponse>('/subject', requestConfig?.config);
