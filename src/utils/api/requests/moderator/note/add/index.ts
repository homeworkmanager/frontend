import { api } from '@/utils/api/instance';

type PostModeratorNoteAddParams = {
  subjectId: number;
  noteText: string;
};

export type PostModeratorNoteAddConfig = AxiosRequestConfig<PostModeratorNoteAddParams>;

export const postModeratorNoteAdd = async ({ params, config }: PostModeratorNoteAddConfig) =>
  api.post<ModeratorNoteAddResponse>(`/moderator/note/add/${params.subjectId}`, { noteText: params.noteText }, config);
