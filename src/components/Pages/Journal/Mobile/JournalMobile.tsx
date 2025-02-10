import React from 'react';

import { useRestructSheduleData } from '../hooks/useRestructSheduleData';
import { CarouselDay } from '../modules/CarouselDay/CarouselDay';

import styles from './JournalMobile.module.css';
import { CarouselWeek } from '@/components/shared/CarouselWeek/CarouselWeek';
import { Loader } from '@/components/ui/Loader';
import { SwiperRef } from 'swiper/react';

export const JournalMobile = () => {
  const { getScheduleStatus, data, values, currentDateIndex } = useRestructSheduleData();

  const [activeWeekNode, setActiveWeekNode] = React.useState(currentDateIndex);

  const [currentDate, setCurrentDate] = React.useState(() => ({
    year: values[currentDateIndex].year,
    month: values[currentDateIndex].month,
    day: currentDateIndex
  }));

  const dayCarouselRef = React.useRef<SwiperRef>(null);
  const weekCarouselRef = React.useRef<SwiperRef>(null);

  const onWeekNodeScroll = () => {
    const weekNodeIndex = (weekCarouselRef.current as SwiperRef).swiper.realIndex;
    if (dayCarouselRef.current !== null) {
      const dayNodeIndex = (dayCarouselRef.current as SwiperRef).swiper.realIndex;
      if (weekNodeIndex * 7 <= activeWeekNode && weekNodeIndex * 7 + 6 > activeWeekNode) {
        setCurrentDate({
          year: values[dayNodeIndex].year,
          month: values[dayNodeIndex].month,
          day: dayNodeIndex
        });
        return;
      }
    }

    setCurrentDate({
      year: values[weekNodeIndex * 7].year,
      month: values[weekNodeIndex * 7].month,
      day: weekNodeIndex * 7
    });
  };

  const onDayNodeScroll = () => {
    requestAnimationFrame(() => {
      const dayNodeIndex = (dayCarouselRef.current as SwiperRef)?.swiper?.realIndex;
      const weekNode = (weekCarouselRef.current as SwiperRef)?.swiper;

      if (dayNodeIndex === undefined || weekNode === undefined) return;

      setActiveWeekNode(dayNodeIndex);

      setCurrentDate({
        year: values[dayNodeIndex].year,
        month: values[dayNodeIndex].month,
        day: dayNodeIndex
      });

      const newWeekIndex = Math.ceil((dayNodeIndex + 1) / 7) - 1;

      weekNode.slideTo(newWeekIndex, 400);
    });
  };

  const onDateNodeClick = (index: number) => {
    if (dayCarouselRef) {
      (dayCarouselRef.current as SwiperRef).swiper.slideTo(index, 0);
    }
  };

  return (
    <article className={styles.container}>
      {getScheduleStatus.loading && <Loader />}
      {getScheduleStatus.success && (
        <>
          <CarouselWeek
            currentDate={currentDate}
            activeWeekNode={activeWeekNode}
            values={values}
            onWeekNodeScroll={onWeekNodeScroll}
            weekCarouselRef={weekCarouselRef}
            setClickedDate={onDateNodeClick}
          />
          <CarouselDay
            currentDateIndex={activeWeekNode}
            apiDates={data}
            onDayNodeScroll={onDayNodeScroll}
            dayCarouselRef={dayCarouselRef}
          />
        </>
      )}
    </article>
  );
};
