import React from 'react';
import { useSelector } from 'react-redux';

import { AddNote } from './modules/AddNote/AddNote';
import { ChangeNote } from './modules/ChangeNote/ChangeNote';
import styles from './NotesList.module.css';
import { Button } from '@/components/ui/Button';
import { AddLogo } from '@/components/ui/Icons/Add';
import { ChangeLogo } from '@/components/ui/Icons/Change';
import { DeleteLogo } from '@/components/ui/Icons/Delete';
import { Loader } from '@/components/ui/Loader';
import { MultiList } from '@/components/ui/MultiList/MultiList';
import { Typhography } from '@/components/ui/Typhography';
import { ModeratorRole } from '@/utils/constants/userRoles';
import { useDeleteNoteMutation } from '@/utils/redux/apiSlices/noteApiSlice/noteApi';
import { getUserRole } from '@/utils/redux/storeSlices/userSlice/selectors';
import clsx from 'clsx';

interface NotesListProps {
  subjectNotes: Note[];
  subjectId: number;
}

export const NotesList = ({ subjectNotes, subjectId }: NotesListProps) => {
  const userRole = useSelector(getUserRole);
  const [notes, setNotes] = React.useState(subjectNotes);

  const [addNoteOpen, setAddNoteOpen] = React.useState(false);

  const [noteId, setNoteId] = React.useState(-1);

  const [deleteNoteMutation, deleteNoteState] = useDeleteNoteMutation();

  const onAddNoteClick = () => {
    setAddNoteOpen((prev) => !prev);
    setNoteId(-1);
  };

  const addNote = (note: Note) => {
    setNotes((prev) => [...prev, { ...note, note_text: note.note_text.replace(/( {2})|(\n{2})/g, '') }]);
    setAddNoteOpen(false);
  };

  const removeNoteId = () => {
    setNoteId(-1);
  };

  const addNoteId = (id: number) => {
    if (noteId !== -1) {
      removeNoteId();
      return;
    }
    setNoteId(id);
    setAddNoteOpen(false);
  };

  const changeNote = (note: Note) => {
    setNotes((prev) => prev.map((item) => (item.note_id === note.note_id ? note : item)));
  };

  const deleteLessonHomework = async (note: Note) => {
    const response = await deleteNoteMutation({ params: { noteId: note.note_id } });

    if (!response.error) {
      setNotes((prev) => prev.filter((item) => item.note_id !== note.note_id));
      if (noteId === note.note_id) removeNoteId();
    }
  };

  console.log(notes);

  return (
    <MultiList>
      {notes.map((note, noteIndex) => (
        <MultiList.Row key={`${note.note_id}_${noteIndex}`} className={styles['']}>
          <MultiList.Column {...(userRole >= ModeratorRole && { icons: 2 })}>
            <Typhography tag="p" variant="thirdy" className={styles['number']} children={`${noteIndex + 1}. `} />
            <Typhography tag="p" variant="thirdy" className={styles['text']} children={note.note_text} />
          </MultiList.Column>
          <MultiList.Column>
            {userRole >= ModeratorRole && (
              <>
                {noteId === -1 || noteId === note.note_id ? (
                  <Button
                    variant="slide"
                    onClick={() => addNoteId(note.note_id)}
                    children={
                      <ChangeLogo className={clsx(styles['icon'], noteId === note.note_id && styles['active'])} />
                    }
                  />
                ) : (
                  <div className={styles['icon']} />
                )}
                <Button
                  variant="slide"
                  onClick={() => deleteLessonHomework(note)}
                  children={
                    deleteNoteState.isLoading ? (
                      <Loader spinnerSize={28} className={styles['loader']} />
                    ) : (
                      <DeleteLogo className={styles['delete-icon']} />
                    )
                  }
                />
              </>
            )}
          </MultiList.Column>
        </MultiList.Row>
      ))}
      {notes.length === 0 && (
        <MultiList.Row>
          <MultiList.Column
            children={
              <Typhography tag="p" variant="thirdy" className={styles['not-found']} children={'Заметки не найдены'} />
            }
          />
        </MultiList.Row>
      )}
      {userRole >= ModeratorRole && (
        <Button
          variant="slide"
          onClick={onAddNoteClick}
          className={styles['add-btn']}
          children={<AddLogo className={clsx(styles['add-icon'], addNoteOpen && styles['active'])} />}
        />
      )}
      {addNoteOpen && <AddNote subjectId={subjectId} addNote={addNote} />}
      {noteId !== -1 && (
        <ChangeNote noteId={noteId} subjectId={subjectId} removeNoteId={removeNoteId} changeNote={changeNote} />
      )}
    </MultiList>
  );
};
