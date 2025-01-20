import { createDate } from '@/utils/helpers/createDate';
import { findIndexByDate } from '@/utils/helpers/findIndexByDate';

const today = new Date();

export const generateValues = () => {
  const values = createDate({
    currentYear: 2024,
    currentMonthIndex: 9,
    currentDayIndex: 2,
    daysCount: 154
  });

  const currentDateIndex = findIndexByDate(values, {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate()
  });

  return { values, currentDateIndex };
};
