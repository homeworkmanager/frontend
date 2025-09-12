import React from 'react';

import { today } from '../constants';

import { SCHEDULE_BEGIN, START_DATE } from '@/utils/constants/dates';
import { TIME_TO_SCHEDULE_REFRESH } from '@/utils/constants/time';
import { scheduleDaysFindIndex } from '@/utils/services/scheduleDays/findIndex';
import { scheduleDaysGenerate } from '@/utils/services/scheduleDays/generate';
import { useGetAllScheduleQuery } from '@/utils/store/middleware/endpoints/schedule';

export const useRestructSheduleData = () => {
  const getSchedule = useGetAllScheduleQuery(
    {
      params: {
        from_time: SCHEDULE_BEGIN.date,
        days_count: SCHEDULE_BEGIN.days
      }
    },
    { pollingInterval: TIME_TO_SCHEDULE_REFRESH }
  );

  const getScheduleResponse = getSchedule?.data;
  const success = getSchedule.isSuccess;

  const transformData = () => (success ? Object.values(getScheduleResponse as AllScheduleResponse) : []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data: DaySchedule[] = React.useMemo(transformData, [getScheduleResponse]);

  const scheduleLessons = React.useMemo(() => data.map((item) => item.outputClasses).reverse(), [data]);

  const values = React.useMemo(
    () =>
      scheduleDaysGenerate({
        currentYear: START_DATE.year,
        currentMonthIndex: START_DATE.month,
        currentDayIndex: START_DATE.day,
        daysCount: SCHEDULE_BEGIN.days,
        AllLessons: scheduleLessons
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  const currentDateIndex = React.useMemo(
    () =>
      scheduleDaysFindIndex(values, {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
      }),

    [values]
  );

  return {
    getScheduleStatus: { success: success, loading: getSchedule.isLoading, error: getSchedule.error },
    data,
    values,
    currentDateIndex
  };
};
