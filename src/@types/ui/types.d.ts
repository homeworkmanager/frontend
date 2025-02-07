type MonthsIndexes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type DaysIndexes =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;

type StartDateType = { year: number; month: MonthsIndexes; day: DaysIndexes };

type Month =
  | 'Январь'
  | 'Февраль'
  | 'Март'
  | 'Апрель'
  | 'Май'
  | 'Июнь'
  | 'Июль'
  | 'Август'
  | 'Сентябрь'
  | 'Октябрь'
  | 'Ноябрь'
  | 'Декабрь';
type Months = {
  [key: number]: Month;
};

interface CustomDate {
  year: number;
  month: number;
  day: number;
}

type Lesson = OutputClass;
type Lessons = Lesson[];
type AllLessons = Lessons[];

type ValuesDate = CustomDate & { lessons: Lessons };
type ValuesDates = ValuesDate[];

type CustomDates = CustomDate[];
type CustomDatesByWeeks = CustomDate[][];

type RestructHomeworkElement = { homeworkText: string; homeworkID: number; isCompleted: boolean };
type RestructHomeworkArray = RestructHomeworkElement[];
