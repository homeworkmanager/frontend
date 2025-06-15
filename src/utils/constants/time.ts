import { pad } from '../helpers/pad';

const START_DATE: StartDateType = {
  year: 2025,
  month: 2,
  day: 3
};

const SEM_START = {
  year: 2025,
  month: 2,
  day: 10
};

const SCHEDULE_BEGIN = {
  date: new Date(
    `${START_DATE.year}-${pad(START_DATE.month)}-${pad(START_DATE.day)}T00:00:00`.concat('.000+03:00')
  ).toISOString(),
  days: 161
};

export { START_DATE, SEM_START, SCHEDULE_BEGIN };
