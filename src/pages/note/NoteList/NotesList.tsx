import React from 'react';
import { useSelector } from 'react-redux';

import { AddNote } from './modules/AddNote';
import { ChangeNote } from './modules/ChangeNote';
import styles from './NotesList.module.css';
import { AddLogo } from '@/shared/Icons/Add';
import { ChangeLogo } from '@/shared/Icons/Change';
import { DeleteLogo } from '@/shared/Icons/Delete';
import { Button } from '@/shared/ui/Button';
import { Loader } from '@/shared/ui/Loader';
import { MultiList } from '@/shared/ui/MultiList';
import { Toast } from '@/shared/ui/Toast';
import { Typhography } from '@/shared/ui/Typhography';
import { USER_ROLES } from '@/utils/constants/userRoles';
import { formatText } from '@/utils/helpers/formatText';
import { useDeleteNoteMutation } from '@/utils/store/middleware/endpoints/note';
import { getUserRole } from '@/utils/store/slices/user/selectors';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';

interface NotesListProps {
  subjectNotes: Note[];
  subjectId: number;
}

export const NotesList = ({ subjectNotes, subjectId }: NotesListProps) => {
  const userRole = useSelector(getUserRole);
  const [notes, setNotes] = React.useState(subjectNotes);

  const [addNoteOpen, setAddNoteOpen] = React.useState(false);
  const [currentNote, setCurrentNote] = React.useState<Note>({ note_id: -1, subject_id: -1, note_text: '' });
  const [deleteNote, deleteNoteState] = useDeleteNoteMutation();

  const onAddNoteClick = () => {
    setAddNoteOpen((prev) => !prev);
    setCurrentNote({ note_id: -1, subject_id: -1, note_text: '' });
  };

  const addNote = (note: Note) => {
    setNotes((prev) => [...prev, { ...note, note_text: formatText(note.note_text) }]);
    setAddNoteOpen(false);
  };

  const removeCurrentNote = () => {
    setCurrentNote({ note_id: -1, subject_id: -1, note_text: '' });
  };

  const addCurrentNote = (note: Note) => {
    if (currentNote.note_id !== -1) {
      removeCurrentNote();
      return;
    }
    setCurrentNote(note);
    setAddNoteOpen(false);
  };

  const changeNote = (note: Note) => {
    setNotes((prev) =>
      prev.map((item) => (item.note_id === note.note_id ? { ...note, note_text: formatText(note.note_text) } : item))
    );
    removeCurrentNote();
  };

  const deleteLessonHomework = async (note: Note) => {
    const response = await deleteNote({ params: { noteId: note.note_id } });

    if (!response.error) {
      setNotes((prev) => prev.filter((item) => item.note_id !== note.note_id));
      if (currentNote.note_id === note.note_id) removeCurrentNote();
    }
  };

  return (
    <>
      <div className={styles['notes-wrapper']}>
        <MultiList>
          {notes.map((note, noteIndex) => (
            <MultiList.Row key={`${note.note_id}_${noteIndex}`} className={styles['']}>
              <MultiList.Column {...(userRole >= USER_ROLES.MODERATOR && { icons: 2 })}>
                <Typhography tag="p" variant="thirdy" className={styles['number']} children={`${noteIndex + 1}. `} />
                <Typhography tag="p" variant="thirdy" className={styles['text']} children={note.note_text} />
              </MultiList.Column>
              <MultiList.Column>
                {userRole >= USER_ROLES.MODERATOR && (
                  <>
                    {currentNote.note_id === -1 || currentNote.note_id === note.note_id ? (
                      <Button
                        variant="logo"
                        onClick={() => addCurrentNote(note)}
                        children={
                          <ChangeLogo
                            className={clsx(styles['icon'], currentNote.note_id === note.note_id && styles['active'])}
                          />
                        }
                      />
                    ) : (
                      <div className={styles['icon']} />
                    )}
                    <Button
                      variant="logo"
                      onClick={() => deleteLessonHomework(note)}
                      children={
                        deleteNoteState.isLoading ? (
                          <Loader spinnerSize={28} className={styles['loader']} />
                        ) : (
                          <DeleteLogo className={styles['delete-icon']} />
                        )
                      }
                    />
                    {deleteNoteState.isError && <Toast type="mobile" text="Ошибка удаления заметки" />}
                  </>
                )}
              </MultiList.Column>
            </MultiList.Row>
          ))}
          {notes.length === 0 && (
            <MultiList.Row>
              <MultiList.Column
                children={
                  <Typhography
                    tag="p"
                    variant="thirdy"
                    className={styles['not-found']}
                    children={'Заметки не найдены'}
                  />
                }
              />
            </MultiList.Row>
          )}
        </MultiList>
      </div>
      {userRole >= USER_ROLES.MODERATOR && (
        <>
          <Button
            variant="logo"
            onClick={onAddNoteClick}
            className={styles['add-btn']}
            children={<AddLogo className={clsx(styles['add-icon'], addNoteOpen && styles['active'])} />}
          />
          <>
            {addNoteOpen && <AddNote subjectId={subjectId} addNote={addNote} />}
            <AnimatePresence>
              {currentNote.note_id !== -1 && (
                <ChangeNote note={currentNote} subjectId={subjectId} changeNote={changeNote} />
              )}
            </AnimatePresence>
          </>
        </>
      )}
    </>
  );
};
