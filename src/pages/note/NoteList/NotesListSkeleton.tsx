import styles from './NotesList.module.css';
import { Skeleton } from '@/shared/ui/Skeleton';

export const NotesListSkeleton = () => (
  <div className={styles['notes-wrapper']}>
    <Skeleton radius="0.25rem" background={false} />
  </div>
);
