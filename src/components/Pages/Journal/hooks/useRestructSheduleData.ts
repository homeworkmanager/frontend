import React from 'react';

import { findIndexByDate } from '../../../../utils/helpers/findIndexByDate';
import { today } from '../constants';

import { createDate } from '@/utils/helpers/createDate';
import { useGetAllScheduleQuery } from '@/utils/redux/apiSlices/scheduleApiSlice/scheduleApi';

export const useRestructSheduleData = () => {
  const getSchedule = useGetAllScheduleQuery({
    params: {
      from_time: '02.09.2024',
      days_count: 154
    }
  });

  const getScheduleResponse = getSchedule?.data;
  const success = getSchedule.isSuccess;

  const transformData = () => (success ? Object.values(getScheduleResponse as AllScheduleResponse) : []);

  const data: DaySchedule[] = React.useMemo(transformData, [getScheduleResponse]);

  const scheduleLessons = React.useMemo(() => data.map((item) => item.outputClasses).reverse(), [data]);

  const values = React.useMemo(
    () =>
      createDate({
        currentYear: 2024,
        currentMonthIndex: 9,
        currentDayIndex: 2,
        daysCount: 154,
        AllLessons: scheduleLessons
      }),
    [data]
  );

  const currentDateIndex = React.useMemo(
    () =>
      findIndexByDate(values, {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
      }),
    []
  );

  return {
    getScheduleStatus: { success: success, loading: getSchedule.isLoading, error: getSchedule.error },
    data,
    values,
    currentDateIndex
  };
};
