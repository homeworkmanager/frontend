import { api } from '@/utils/api/instance';

export type GetNoteConfig = AxiosRequestConfig | undefined;

export const getNote = async (requestConfig?: GetNoteConfig) => api.get<NoteResponse>('/note', requestConfig?.config);
