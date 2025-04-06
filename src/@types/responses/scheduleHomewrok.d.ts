type ScheduleHomeworkElement = {
  homeworkID: number;
  isCompleted: boolean;
  subjectName: string;
  homeworkText: string;
  dueDate: string;
};

type DayHomeworks = {
  homework: ScheduleHomeworkElement[];
};

type ScheduleHomeworkResponse = {
  [date: string]: DayHomeworks;
} & BaseResponse;
