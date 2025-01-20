type HomeworkElement = {
  homeworkID: number;
  classSemNumber: number | null;
  subjectId: number;
  homeworkText: string;
  dueDate: string; // ISO 8601 format
};

type ClassDetails = {
  subjectId: number;
  category: string;
  description: string;
  startTime: string; // ISO 8601 format
  endTime: string; // ISO 8601 format
  summary: string;
  semClassNumber: number;
  location: string;
};

type OutputClass = {
  class: ClassDetails;
  homework: HomeworkElement[];
};

type DaySchedule = {
  outputClasses: OutputClass[];
  independentHomeworks: HomeworkElement[];
};

type AllScheduleResponse = {
  [date: string]: DaySchedule;
} & BaseResponse;
