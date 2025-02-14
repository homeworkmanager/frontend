import React from 'react';

import styles from './AddNote.module.css';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { Textarea } from '@/components/ui/Textarea';
import { Typhography } from '@/components/ui/Typhography';
import { usePostAddNoteMutation } from '@/utils/redux/apiSlices/noteApiSlice/noteApi';
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
        noteText: noteText.replace(/( {2})|(\n{2})/g, ''),
        subjectId: subjectId
      }
    });

    if (!postAddNoteResponse.error) {
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
      {postAddNoteState.isError && (
        <Typhography tag="p" variant="thirdy" className={styles['error']}>
          Ошибка
        </Typhography>
      )}
    </motion.article>
  );
};
