import React from 'react';

import { findIndexByDate } from '../../../../utils/helpers/findIndexByDate';
import { today } from '../constants';

import { HContext } from '@/App/modules/HContext';
import { IHContext } from '@/App/modules/IHContext';
import { createDate } from '@/utils/helpers/createDate';
import { useGetAllScheduleQuery } from '@/utils/redux/apiSlices/scheduleApiSlice/scheduleApi';

export const useRestructSheduleData = () => {
  const getSchedule = useGetAllScheduleQuery(
    {
      params: {
        from_time: '02.09.2024',
        days_count: 154
      }
    },
    {
      selectFromResult: (data) => {
        return data;
      }
    }
  );

  const getScheduleResponse = getSchedule?.data;
  const success = getSchedule.isSuccess;

  const transformData = () => (success ? Object.values(getScheduleResponse as AllScheduleResponse) : []);

  const data: DaySchedule[] = React.useMemo(transformData, [getScheduleResponse]);

  const scheduleLessons = React.useMemo(() => data.map((item) => item.outputClasses).reverse(), [data]);

  const { initIH } = React.useContext(IHContext);
  const { initH } = React.useContext(HContext);

  const processedIH = React.useMemo(() => {
    return data.map((item) => {
      return item.independentHomeworks.map((hw) => {
        return { homeworkID: hw.homeworkID, homeworkText: hw.homeworkText, isCompleted: hw.isCompleted };
      });
    });
  }, [data]);

  const processedH = React.useMemo(() => {
    return data.map((item) =>
      item.outputClasses.map((lesson) =>
        lesson.homework.map((hw) => ({
          homeworkID: hw.homeworkID,
          homeworkText: hw.homeworkText,
          isCompleted: hw.isCompleted
        }))
      )
    );
  }, [data]);

  React.useLayoutEffect(() => {
    initIH(processedIH);
    initH(processedH);
  }, [initIH, processedIH, initH, processedH]);

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
