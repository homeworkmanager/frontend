import React from 'react';

import styles from './AddNote.module.css';
import { Button } from '@/shared/ui/Button';
import { Loader } from '@/shared/ui/Loader';
import { Textarea } from '@/shared/ui/Textarea';
import { Toast } from '@/shared/ui/Toast';
import { formatText } from '@/utils/helpers/formatText';
import { usePostAddNoteMutation } from '@/utils/store/middleware/endpoints/note';
import { motion } from 'framer-motion';

interface AddNoteProps {
  subjectId: number;
  addNote: (note: Note) => void;
}

export const AddNote = ({ subjectId, addNote }: AddNoteProps) => {
  const [postAddNoteMutation, postAddNoteState] = usePostAddNoteMutation();
  const [noteText, setNoteText] = React.useState('');
  const sendNote = async () => {
    const postAddNoteResponse = await postAddNoteMutation({
      params: {
        noteText: formatText(noteText),
        subjectId: subjectId
      }
    });

    if (!postAddNoteResponse.error && postAddNoteResponse.data) {
      addNote({
        note_text: noteText,
        subject_id: subjectId,
        note_id: postAddNoteResponse.data.note_id
      });
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={styles['section']}
    >
      <Textarea onChange={(e) => setNoteText(e.target.value)} label="Добавить заметку" name={`${subjectId}`} />
      <Button variant="accept" disabled={postAddNoteState.isLoading || !noteText} onClick={sendNote}>
        {postAddNoteState.isLoading ? <Loader /> : 'Добавить'}
      </Button>
      {postAddNoteState.isError && <Toast type="mobile" text="Ошибка добавления заметки" />}
    </motion.article>
  );
};
