import { ScheduleHomework } from '../modules/ScheduleHomework/ScheduleHomework';

import styles from './HomeworkAggregatedMobile.module.css';
import { pad } from '@/utils/helpers/pad';
import { useGetScheduleHomeworkQuery } from '@/utils/redux/apiSlices/scheduleApiSlice/scheduleApi';

export const HomeworkAggregatedMobile = () => {
  const { data } = useGetScheduleHomeworkQuery({
    params: {
      from_time: new Date(`${2025}-${pad(4)}-${pad(4)}T00:00:00`.concat('.000+03:00')).toISOString(),
      days_count: 10
    }
  });

  return (
    <ul className={styles['container']}>
      {data &&
        Object.keys(data).map((item) => <ScheduleHomework key={item} Homeworks={data[item].homework} DayDate={item} />)}
    </ul>
  );
};
