import { pad } from '../helpers/pad';

const startDate: StartDateType = {
  year: 2025,
  month: 2,
  day: 3
};

const semStart = {
  year: 2025,
  month: 2,
  day: 10
};

const scheduleBeginDate = {
  date: new Date(
    `${startDate.year}-${pad(startDate.month)}-${pad(startDate.day)}T00:00:00`.concat('.000+03:00')
  ).toISOString(),
  days: 161
};

export { startDate, semStart, scheduleBeginDate };
