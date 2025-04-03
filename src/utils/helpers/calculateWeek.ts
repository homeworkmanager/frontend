import { SEM_START } from '../configs/time.config';

const startDate = new Date(SEM_START.year, SEM_START.month - 1, SEM_START.day);

export const calculateWeek = (date: { year: number; month: number; day: number }) => {
  const inputDate = new Date(date.year, date.month - 1, date.day);

  const timeDifference = inputDate.getTime() - startDate.getTime();

  const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const weekNumber = Math.floor(dayDifference / 7) + 1;

  return weekNumber;
};
