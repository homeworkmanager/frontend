interface Subject {
  subject_id: number;
  subject_name: string;
}

interface Note {
  note_id: number;
  subject_id: number;
  note_text: string;
}

interface SubjectNoteElem {
  subject: Subject;
  notes: Note[];
}

type NoteResponse = SubjectNoteElem[];
