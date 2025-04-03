import React from 'react';
import { useSelector } from 'react-redux';

import { NotesList } from './NoteList/NotesList';
import styles from './SubjectsNote.module.css';
import { Loader } from '@/components/ui/Loader';
import { Typhography } from '@/components/ui/Typhography';
import { MODERATOR_ROLE } from '@/utils/configs/userRoles.config';
import { useGetNoteQuery } from '@/utils/redux/apiSlices/noteApiSlice/noteApi';
import { getUserRole } from '@/utils/redux/storeSlices/userSlice/selectors';

export const SubjectsNote = () => {
  const getNotes = useGetNoteQuery(undefined);

  const role = useSelector(getUserRole);

  return (
    <article className={styles.container}>
      {getNotes.isLoading && <Loader />}
      {getNotes.isSuccess && (
        <ul className={styles['content']}>
          {getNotes.data.map((note) => (
            <React.Fragment key={note.subject.subject_id}>
              {(role >= MODERATOR_ROLE || note.notes.length > 0) && (
                <li className={styles['item']}>
                  <div className={styles['subject-wrapper']}>
                    <Typhography
                      tag="h3"
                      variant="thirdy"
                      className={styles['subject']}
                      children={`${note.subject.subject_name}`}
                    />
                  </div>
                  <NotesList subjectId={note.subject.subject_id} subjectNotes={note.notes} />
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      )}
    </article>
  );
};
