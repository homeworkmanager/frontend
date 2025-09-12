import { NotesListSkeleton } from './NoteList';
import styles from './SubjectsNote.module.css';
import { Skeleton } from '@/shared/ui/Skeleton';
import { generateNumericArray } from '@/utils/helpers/generateNumericArray';

const subjects = generateNumericArray(3);

export const SubjectNotesLoading = () => (
  <article className={styles.container}>
    <ul className={styles['content']}>
      {subjects.map((_, index) => (
        <li key={index} className={styles['item']}>
          <div className={styles['subject-wrapper']}>
            <Skeleton height="3.5rem" radius="0.5rem" />
          </div>
          <NotesListSkeleton />
        </li>
      ))}
    </ul>
  </article>
);
