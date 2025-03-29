import { scheduleBeginDate, startDate } from '@/utils/configs/time.config';
import { createDate } from '@/utils/helpers/createDate';
import { findIndexByDate } from '@/utils/helpers/findIndexByDate';

const today = new Date();

export const generateValues = () => {
  const values = createDate({
    currentYear: startDate.year,
    currentMonthIndex: startDate.month,
    currentDayIndex: startDate.day,
    daysCount: scheduleBeginDate.days
  });

  const currentDateIndex = findIndexByDate(values, {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate()
  });

  return { values, currentDateIndex };
};
