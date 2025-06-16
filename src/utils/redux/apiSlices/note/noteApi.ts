import { axiosBaseQuery } from '../axiosBaseQuery';

import { postModeratorNoteAdd, PostModeratorNoteAddConfig } from '@/utils/api/requests/moderator/note/add';
import { deleteModeratorNote, DeleteModeratorNoteConfig } from '@/utils/api/requests/moderator/note/delete';
import { patchModeratorNoteUpdate, PatchModeratorNoteUpdateConfig } from '@/utils/api/requests/moderator/note/update';
import { getNote, GetNoteConfig } from '@/utils/api/requests/note';
import { STORE_NOTES } from '@/utils/constants/dbStores';
import dbRepositories from '@/utils/db/UniHelper';
import { createApi } from '@reduxjs/toolkit/query/react';
import { AxiosError } from 'axios';

export const noteApi = createApi({
  reducerPath: 'noteApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['GetNote'],
  endpoints: (builder) => ({
    getNote: builder.query<NoteResponse, GetNoteConfig>({
      async queryFn(requestConfig: GetNoteConfig) {
        const cacheKey = STORE_NOTES;
        const notesRepo = await dbRepositories.notes;

        try {
          const response = await getNote(requestConfig);

          await notesRepo.set(cacheKey, response.data);

          return { data: response.data };
        } catch (error) {
          const cached = await notesRepo.get(cacheKey);

          if (cached) return { data: cached?.data };

          const err = error as AxiosError;
          return {
            error: {
              status: err.response?.status,
              data: err.response?.data || err.message
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
