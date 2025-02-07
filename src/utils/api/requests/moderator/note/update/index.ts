import { api } from '@/utils/api/instance';

type PatchModeratorNoteUpdateParams = {
  noteId: number;
  noteText: string;
};

export type PatchModeratorNoteUpdateConfig = AxiosRequestConfig<PatchModeratorNoteUpdateParams>;

export const patchModeratorNoteUpdate = async ({ params, config }: PatchModeratorNoteUpdateConfig) =>
  api.patch<ModeratorUpdateResponse>(`/moderator/note/update/${params.noteId}`, { noteText: params.noteText }, config);
