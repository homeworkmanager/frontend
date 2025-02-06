import React from 'react';

import styles from './ChangeNote.module.css';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loader } from '@/components/ui/Loader';
import { Typhography } from '@/components/ui/Typhography';
import { usePatchNoteMutation } from '@/utils/redux/apiSlices/noteApiSlice/noteApi';
import { AnimatePresence, motion } from 'framer-motion';

interface ChangeLessonHomeworkProps {
  noteId: number;
  subjectId: number;
  removeNoteId: () => void;
  changeNote: (note: Note) => void;
}

export const ChangeNote = ({ changeNote, noteId, subjectId, removeNoteId }: ChangeLessonHomeworkProps) => {
  const [patchUpdateNoteMutation, patchUpdateNoteState] = usePatchNoteMutation();
  const [noteText, setNoteText] = React.useState('');
  const updateNote = async () => {
    const response = await patchUpdateNoteMutation({
      params: { noteId: noteId, noteText: noteText }
    });

    if (!response.error) {
      changeNote({
        note_id: noteId,
        note_text: noteText,
        subject_id: subjectId
      });
      removeNoteId();
    }
  };

  return (
    <AnimatePresence>
      {noteId !== -1 && (
        <motion.aside
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={styles['section']}
        >
          <Input
            onChange={(e) => setNoteText(e.target.value)}
            label="Изменить заметку"
            variant="homework"
            name={`${subjectId} ${noteId}`}
          />
          <Button variant="accept" disabled={patchUpdateNoteState.isLoading || !noteText} onClick={updateNote}>
            {patchUpdateNoteState.isLoading ? <Loader /> : 'Изменить'}
          </Button>
          {patchUpdateNoteState.isError && (
            <Typhography tag="p" variant="thirdy" className={styles['error']}>
              Ошибка
            </Typhography>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
