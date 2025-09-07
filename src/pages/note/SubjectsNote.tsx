import React from 'react';
import { useSelector } from 'react-redux';

import { NotesList } from './NoteList/NotesList';
import styles from './SubjectsNote.module.css';
import { SubjectNotesLoading } from './SubjectsNoteLoading';
import { Typhography } from '@/shared/ui/Typhography';
import { TIME_TO_NOTES_REFRESH } from '@/utils/constants/time';
import { USER_ROLES } from '@/utils/constants/userRoles';
import { useGetNoteQuery } from '@/utils/redux/apiSlices/note/noteApi';
import { getUserRole } from '@/utils/redux/storeSlices/user/selectors';
import clsx from 'clsx';

export default function SubjectsNote() {
  const getNotes = useGetNoteQuery(undefined, { pollingInterval: TIME_TO_NOTES_REFRESH });

  const role = useSelector(getUserRole);

  return (
    <>
      {getNotes.isLoading && <SubjectNotesLoading />}
      {getNotes.isSuccess && !!getNotes.data && (
        <article className={styles.container}>
          <ul className={styles['content']}>
            {getNotes.data.map((note) => (
              <React.Fragment key={note.subject.subject_id}>
                {(role >= USER_ROLES.MODERATOR || note.notes.length > 0) && (
                  <li className={clsx(styles['item'], role > USER_ROLES.BASE && styles['add'])}>
                    <div className={styles['subject-wrapper']}>
                      <Typhography tag="h3" variant="thirdy" children={`${note.subject.subject_name}`} />
                    </div>
                    <NotesList subjectId={note.subject.subject_id} subjectNotes={note.notes} />
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </article>
      )}
    </>
  );
}
