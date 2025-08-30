import { pad } from '../helpers/pad';

const START_DATE: StartDateType = {
  year: 2025,
  month: 8,
  day: 25
};

const SEM_START = {
  year: 2025,
  month: 9,
  day: 1
};

const SCHEDULE_BEGIN = {
  date: new Date(
    `${START_DATE.year}-${pad(START_DATE.month)}-${pad(START_DATE.day)}T00:00:00`.concat('.000+03:00')
  ).toISOString(),
  days: 364
};

export { START_DATE, SEM_START, SCHEDULE_BEGIN };
