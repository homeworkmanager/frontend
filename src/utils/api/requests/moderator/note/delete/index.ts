import { api } from '@/utils/api/instance';

type DeleteModeratorNoteParams = {
  noteId: number;
};

export type DeleteModeratorNoteConfig = AxiosRequestConfig<DeleteModeratorNoteParams>;

export const deleteModeratorNote = async ({ params, config }: DeleteModeratorNoteConfig) =>
  api.delete<ModeratorDeleteResponse>(`/moderator/note/delete/${params.noteId}`, config);
