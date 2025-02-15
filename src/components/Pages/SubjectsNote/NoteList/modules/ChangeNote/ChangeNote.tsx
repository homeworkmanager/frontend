import React from 'react';

import styles from './ChangeNote.module.css';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { Textarea } from '@/components/ui/Textarea';
import { Typhography } from '@/components/ui/Typhography';
import { formatText } from '@/utils/helpers/formatText';
import { usePatchNoteMutation } from '@/utils/redux/apiSlices/noteApiSlice/noteApi';
import { AnimatePresence, motion } from 'framer-motion';

interface ChangeLessonHomeworkProps {
  note: Note;
  subjectId: number;
  removeNoteId: () => void;
  changeNote: (note: Note) => void;
}

export const ChangeNote = ({ changeNote, note, subjectId, removeNoteId }: ChangeLessonHomeworkProps) => {
  const [patchUpdateNoteMutation, patchUpdateNoteState] = usePatchNoteMutation();

  console.log(note);

  const [noteText, setNoteText] = React.useState(note.note_text);
  const updateNote = async () => {
    const response = await patchUpdateNoteMutation({
      params: { noteId: note.note_id, noteText: noteText }
    });

    if (!response.error) {
      changeNote({
        note_id: note.note_id,
        note_text: formatText(noteText),
        subject_id: subjectId
      });
      removeNoteId();
    }
  };

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={styles['section']}
      >
        <Textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          label="Изменить заметку"
          name={`${subjectId} ${note}`}
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
    </AnimatePresence>
  );
};
