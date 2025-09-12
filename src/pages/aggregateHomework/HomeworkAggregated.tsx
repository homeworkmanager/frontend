import React from 'react';

import styles from './HomeworkAggregated.module.css';
import { HomeworkAggregatedLoading } from './HomeworkAggregatedLoading';
import { ScheduleHomework } from './ScheduleHomework';
import { Typhography } from '@/shared/ui/Typhography';
import { SCHEDULE_BEGIN } from '@/utils/constants/dates';
import { TIME_TO_HOMEWORKS_REFRESH } from '@/utils/constants/time';
import { pad } from '@/utils/helpers/pad';
import { useGetScheduleHomeworkQuery } from '@/utils/store/middleware/endpoints/schedule';

const beginDate = `${new Date().getFullYear()}-${pad(new Date().getMonth() + 1)}-${pad(new Date().getDate())}`;

export default function HomeworkAggregated() {
  const targetRef = React.useRef<HTMLLIElement>(null);

  const getHomeworksResponse = useGetScheduleHomeworkQuery(
    {
      params: {
        from_time: SCHEDULE_BEGIN.date,
        days_count: SCHEDULE_BEGIN.days
      }
    },
    { pollingInterval: TIME_TO_HOMEWORKS_REFRESH }
  );

  const findBeginDate = () => {
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
    <>
      {getHomeworksResponse.isSuccess && getHomeworksResponse.data && (
        <ul className={styles['container']}>
          {Object.keys(getHomeworksResponse.data).length === 0 && (
            <Typhography
              tag="h2"
              style={{ textAlign: 'center' }}
              variant="secondary"
              children={'Домашних заданий нет!'}
            />
          )}
          {Object.keys(getHomeworksResponse.data).map((date) => (
            <li key={date} {...(date === startDate && { ref: targetRef })}>
              <ScheduleHomework
                Homeworks={getHomeworksResponse.data[date].homework}
                DayDate={date}
                CurrentDate={startDate}
              />
            </li>
          ))}
        </ul>
      )}
      {getHomeworksResponse.isLoading && <HomeworkAggregatedLoading />}
    </>
  );
}
