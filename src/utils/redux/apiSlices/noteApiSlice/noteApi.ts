import { postModeratorNoteAdd, PostModeratorNoteAddConfig } from '@/utils/api/requests/moderator/note/add';
import { deleteModeratorNote, DeleteModeratorNoteConfig } from '@/utils/api/requests/moderator/note/delete';
import { patchModeratorNoteUpdate, PatchModeratorNoteUpdateConfig } from '@/utils/api/requests/moderator/note/update';
import { getNote, GetNoteConfig } from '@/utils/api/requests/note';
import dbRepositories from '@/utils/db/UniHelper';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const noteApi = createApi({
  reducerPath: 'noteApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['GetNote'],
  endpoints: (builder) => ({
    getNote: builder.query<NoteResponse, GetNoteConfig>({
      async queryFn(requestConfig: GetNoteConfig) {
        const cacheKey = 'notes';
        const notesRepo = await dbRepositories.notes;

        try {
          const response = await getNote(requestConfig);

          await notesRepo.set(cacheKey, response.data);

          return { data: response.data };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          const cached = await notesRepo.get(cacheKey);

          if (cached) return { data: cached?.data };

          return {
            error: {
              status: error.response?.status,
              data: error.response?.data || error.message
            }
          };
        }
      },
      providesTags: ['GetNote']
    }),
    postAddNote: builder.mutation({
      queryFn: ({ params, config }: PostModeratorNoteAddConfig) => postModeratorNoteAdd({ params, config }),
      invalidatesTags: ['GetNote']
    }),
    deleteNote: builder.mutation({
      queryFn: ({ params, config }: DeleteModeratorNoteConfig) => deleteModeratorNote({ params, config }),
      invalidatesTags: ['GetNote']
    }),
    patchNote: builder.mutation({
      queryFn: ({ params, config }: PatchModeratorNoteUpdateConfig) => patchModeratorNoteUpdate({ params, config }),
      invalidatesTags: ['GetNote']
    })
  })
});

export const { useGetNoteQuery, usePostAddNoteMutation, useDeleteNoteMutation, usePatchNoteMutation } = noteApi;
