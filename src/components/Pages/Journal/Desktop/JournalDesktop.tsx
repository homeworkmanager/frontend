import React from 'react';

import { useRestructSheduleData } from '../hooks/useRestructSheduleData';
import { CarouselDay } from '../modules/CarouselDay/CarouselDay';

import styles from './JournalDesktop.module.css';
import { CarouselMonth } from '@/components/shared/CarouselMonth/CarouselMonth';
import { Loader } from '@/components/ui/Loader';
import { SwiperRef } from 'swiper/react';

export const JournalDesktop = () => {
  const { getScheduleStatus, data, values, currentDateIndex } = useRestructSheduleData();

  const [activeWeekNode, setActiveWeekNode] = React.useState(currentDateIndex);

  const [currentDate, setCurrentDate] = React.useState(() => ({
    year: values[currentDateIndex].year,
    month: values[currentDateIndex].month,
    day: currentDateIndex
  }));

  const dayCarouselRef = React.useRef<SwiperRef>(null);
  const monthCarouselRef = React.useRef<SwiperRef>(null);

  const onMonthNodeClick = (dayIndex: number) => {
    dayCarouselRef.current?.swiper.slideTo(dayIndex, 0);
  };

  const onDayNodeScroll = () => {
    const dayNodeIndex = (dayCarouselRef.current as SwiperRef).swiper.realIndex;
    const monthNode = (monthCarouselRef.current as SwiperRef).swiper;

    setActiveWeekNode(dayNodeIndex);

    setCurrentDate({
      year: values[dayNodeIndex].year,
      month: values[dayNodeIndex].month,
      day: dayNodeIndex
    });

    monthNode.slideTo(Math.ceil((dayNodeIndex + 1) / 35) - 1, 0);
  };

  return (
    <article className={styles.container}>
      {getScheduleStatus.loading && <Loader />}
      {getScheduleStatus.success && (
        <div className={styles['journal-body']}>
          <CarouselMonth
            values={values}
            currentDate={currentDate}
            activeMonthNode={activeWeekNode}
            monthCarouselRef={monthCarouselRef}
            setClickedDate={onMonthNodeClick}
          />
          <CarouselDay
            className={styles['desktop']}
            currentDateIndex={activeWeekNode}
            apiDates={data}
            onDayNodeScroll={onDayNodeScroll}
            dayCarouselRef={dayCarouselRef}
          />
        </div>
      )}
    </article>
  );
};
