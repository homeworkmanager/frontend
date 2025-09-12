type ScheduleHomeworkElement = {
  homeworkID: number;
  isCompleted: boolean;
  subjectName: string;
  homeworkText: string;
  dueDate: string;
  files: FileElem[];
};

type DayHomeworks = {
  homework: ScheduleHomeworkElement[];
};

type ScheduleHomeworkResponse = {
  [date: string]: DayHomeworks;
};
