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
import { formatText } from '@/utils/helpers/formatText';
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

  const [currentNote, setCurrentNote] = React.useState<Note>({ note_id: -1, subject_id: -1, note_text: '' });

  const [deleteNoteMutation, deleteNoteState] = useDeleteNoteMutation();

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
  };

  const deleteLessonHomework = async (note: Note) => {
    const response = await deleteNoteMutation({ params: { noteId: note.note_id } });

    if (!response.error) {
      setNotes((prev) => prev.filter((item) => item.note_id !== note.note_id));
      if (currentNote.note_id === note.note_id) removeCurrentNote();
    }
  };

  const scrollHandler = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.scrollTop > 0) {
      target.style.backgroundColor = 'var(--component-background-color)';
    } else {
      target.style.backgroundColor = '';
    }
  };

  return (
    <>
      <div className={styles['notes-wrapper']} onScroll={scrollHandler}>
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
                    {currentNote.note_id === -1 || currentNote.note_id === note.note_id ? (
                      <Button
                        variant="slide"
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
      {userRole >= ModeratorRole && (
        <Button
          variant="slide"
          onClick={onAddNoteClick}
          className={styles['add-btn']}
          children={<AddLogo className={clsx(styles['add-icon'], addNoteOpen && styles['active'])} />}
        />
      )}
      {addNoteOpen && <AddNote subjectId={subjectId} addNote={addNote} />}
      {currentNote.note_id !== -1 && (
        <ChangeNote note={currentNote} subjectId={subjectId} removeNoteId={removeCurrentNote} changeNote={changeNote} />
      )}
    </>
  );
};
