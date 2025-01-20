import React from 'react';

import { findIndexByDate } from '../../../../utils/helpers/findIndexByDate';
import { today } from '../constants';

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

  const data = React.useMemo(transformData, [getScheduleResponse]);

  const scheduleLessons = React.useMemo(() => data.map((item) => item.outputClasses).reverse(), [data]);

  const { init } = React.useContext(IHContext);

  const processedData = React.useMemo(() => {
    return data.map((item) => {
      return item.independentHomeworks.map((homework) => {
        return { homeworkID: homework.homeworkID, homeworkText: homework.homeworkText };
      });
    });
  }, [data]);

  React.useEffect(() => {
    init(processedData);
  }, [init, processedData]);

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
