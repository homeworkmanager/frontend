import React from 'react';

import styles from './HomeworkAggregated.module.css';
import { ScheduleHomework } from './ScheduleHomework/ScheduleHomework';
import { SCHEDULE_BEGIN } from '@/utils/constants/time';
import { pad } from '@/utils/helpers/pad';
import { useGetScheduleHomeworkQuery } from '@/utils/redux/apiSlices/schedule';

const beginDate = `${new Date().getFullYear()}-${pad(new Date().getMonth() + 1)}-${pad(new Date().getDate())}`;

export const HomeworkAggregated = () => {
  const targetRef = React.useRef<HTMLLIElement>(null);

  const getHomeworksResponse = useGetScheduleHomeworkQuery({
    params: {
      from_time: SCHEDULE_BEGIN.date,
      days_count: SCHEDULE_BEGIN.days
    }
  });

  const findBeginDate = (): string => {
    if (targetRef.current || !getHomeworksResponse.data) return '';
    if (getHomeworksResponse.data[beginDate]) return beginDate;

    const keys = Object.keys(getHomeworksResponse.data);

    const startDate = keys.find((key) => {
      if (new Date(key).getTime() > new Date(beginDate).getTime()) return key;
    });

    if (startDate) return startDate;

    return keys[keys.length - 1];
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const startDate = React.useMemo(() => findBeginDate(), [getHomeworksResponse.isLoading]);

  React.useLayoutEffect(() => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: 'auto',
        block: 'start',
        inline: 'nearest'
      });
    }
  }, [getHomeworksResponse.isLoading]);

  return (
    <ul className={styles.container}>
      {getHomeworksResponse.data &&
        Object.keys(getHomeworksResponse.data).map((date) => {
          if (!getHomeworksResponse.data) return null;

          return (
            <li key={date} {...(date === startDate && { ref: targetRef })}>
              <ScheduleHomework
                Homeworks={getHomeworksResponse.data[date].homework}
                DayDate={date}
                CurrentDate={startDate}
              />
            </li>
          );
        })}
    </ul>
  );
};
