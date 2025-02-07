import { postModeratorNoteAdd, PostModeratorNoteAddConfig } from '@/utils/api/requests/moderator/note/add';
import { deleteModeratorNote, DeleteModeratorNoteConfig } from '@/utils/api/requests/moderator/note/delete';
import { patchModeratorNoteUpdate, PatchModeratorNoteUpdateConfig } from '@/utils/api/requests/moderator/note/update';
import { getNote, GetNoteConfig } from '@/utils/api/requests/note';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const noteApi = createApi({
  reducerPath: 'noteApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['GetNote'],
  endpoints: (builder) => ({
    getNote: builder.query<NoteResponse, GetNoteConfig>({
      queryFn: (requestConfig: GetNoteConfig) => getNote(requestConfig),
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
