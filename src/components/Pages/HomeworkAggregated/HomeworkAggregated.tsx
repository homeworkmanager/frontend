import React from 'react';

import styles from './HomeworkAggregated.module.css';
import { ScheduleHomework } from './modules/ScheduleHomework/ScheduleHomework';
import { SCHEDULE_BEGIN } from '@/utils/configs/time.config';
import { pad } from '@/utils/helpers/pad';
import { useGetScheduleHomeworkQuery } from '@/utils/redux/apiSlices/schedule';

const beginDate = `${new Date().getFullYear()}-${pad(new Date().getMonth() + 1)}-${pad(new Date().getDate())}`;

export const HomeworkAggregated = () => {
  const containerRef = React.useRef<HTMLUListElement>(null);
  const targetRef = React.useRef<HTMLLIElement>(null);

  const nextHomeworksResponse = useGetScheduleHomeworkQuery({
    params: {
      from_time: SCHEDULE_BEGIN.date,
      days_count: SCHEDULE_BEGIN.days
    }
  });

  React.useLayoutEffect(() => {
    if (targetRef.current && containerRef.current) {
      targetRef.current.scrollIntoView({
        behavior: 'auto',
        block: 'start',
        inline: 'nearest'
      });
    }
  }, [nextHomeworksResponse.isFetching]);

  return (
    <ul className={styles.container} ref={containerRef}>
      {nextHomeworksResponse.data &&
        Object.keys(nextHomeworksResponse.data).map((date) => {
          if (!nextHomeworksResponse.data) return null;

          return (
            <li key={date} ref={date === beginDate ? targetRef : null}>
              <ScheduleHomework Homeworks={nextHomeworksResponse.data[date].homework} DayDate={date} />
            </li>
          );
        })}
    </ul>
  );
};
