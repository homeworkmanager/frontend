import { NotesList } from './NoteList/NotesList';
import styles from './SubjectsNote.module.css';
import { Loader } from '@/components/ui/Loader';
import { Typhography } from '@/components/ui/Typhography';
import { useGetNoteQuery } from '@/utils/redux/apiSlices/noteApiSlice/noteApi';

export const SubjectsNote = () => {
  const getNotes = useGetNoteQuery(undefined);

  return (
    <article className={styles.container}>
      {getNotes.isLoading && <Loader />}
      {getNotes.isSuccess && (
        <ul className={styles['content']}>
          {getNotes.data.map((note) => (
            <li key={note.subject.subject_id} className={styles['item']}>
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
          ))}
        </ul>
      )}
    </article>
  );
};
