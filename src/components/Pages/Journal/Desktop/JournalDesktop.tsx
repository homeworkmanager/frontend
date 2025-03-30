import React from 'react';

import { useRestructSheduleData } from '../hooks/useRestructSheduleData';
import { CarouselDay } from '../modules/CarouselDay/CarouselDay';

import styles from './JournalDesktop.module.css';
import { CarouselMonth } from '@/components/shared/CarouselMonth/CarouselMonth';
import { Loader } from '@/components/ui/Loader';
import { SwiperRef } from 'swiper/react';

export const JournalDesktop = () => {
  const { getScheduleStatus, data, values, currentDateIndex } = useRestructSheduleData();

  const [activeMonthNode, setActiveMonthNode] = React.useState(currentDateIndex);

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
    const dayNode = dayCarouselRef.current?.swiper;
    const monthNode = monthCarouselRef.current?.swiper;

    if (dayNode === undefined || monthNode === undefined) return;

    if (dayNode.animating) return;

    setActiveMonthNode(dayNode.activeIndex);

    setCurrentDate({
      year: values[dayNode.activeIndex].year,
      month: values[dayNode.activeIndex].month,
      day: dayNode.activeIndex
    });

    const newMonthIndex = Math.ceil((dayNode.activeIndex + 1) / 35) - 1;

    if (monthNode.realIndex !== newMonthIndex) {
      monthNode.slideTo(newMonthIndex, 400);
    }
  };

  return (
    <article className={styles.container}>
      {getScheduleStatus.loading && <Loader />}
      {getScheduleStatus.success && (
        <div className={styles['journal-body']}>
          <CarouselMonth
            values={values}
            currentDate={currentDate}
            activeMonthNode={activeMonthNode}
            monthCarouselRef={monthCarouselRef}
            setClickedDate={onMonthNodeClick}
          />
          <CarouselDay
            className={styles['desktop']}
            currentDateIndex={activeMonthNode}
            apiDates={data}
            onDayNodeScroll={onDayNodeScroll}
            dayCarouselRef={dayCarouselRef}
          />
        </div>
      )}
    </article>
  );
};
