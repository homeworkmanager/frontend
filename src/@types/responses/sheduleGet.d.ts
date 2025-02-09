type HomeworkElement = {
  homeworkID: number;
  isCompleted: boolean;
  subjectId: number;
  homeworkText: string;
  dueDate: string;
};

type IndependentHomeworkElement = Omit<HomeworkElement, 'subjectId'> & {
  subjectName: string;
};

type ClassDetails = {
  subjectId: number;
  category: string;
  description: string;
  startTime: string;
  endTime: string;
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
  independentHomeworks: IndependentHomeworkElement[];
};

type AllScheduleResponse = {
  [date: string]: DaySchedule;
} & BaseResponse;
