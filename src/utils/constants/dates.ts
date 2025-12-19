import { pad } from '../helpers/pad';

export const MONTH_DATA: Months = {
  1: 'Январь',
  2: 'Февраль',
  3: 'Март',
  4: 'Апрель',
  5: 'Май',
  6: 'Июнь',
  7: 'Июль',
  8: 'Август',
  9: 'Сентябрь',
  10: 'Октябрь',
  11: 'Ноябрь',
  12: 'Декабрь'
};

export const START_DATE: StartDateType = {
  year: 2025,
  month: 8,
  day: 25
};

export const SEM_START = {
  year: 2025,
  month: 9,
  day: 1
};

export const SCHEDULE_BEGIN = {
  date: new Date(
    `${START_DATE.year}-${pad(START_DATE.month)}-${pad(START_DATE.day)}T00:00:00`.concat('.000+03:00')
  ).toISOString(),
  days: 364
};

export const FIRST_SESSION_DAY: CustomDate = { year: 2025, month: 12, day: 23 };
