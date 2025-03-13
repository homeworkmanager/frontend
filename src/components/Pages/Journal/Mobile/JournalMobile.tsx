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

  const [currentDate, setCurrentDate] = React.useState<CustomDate>(() => ({
    year: values[currentDateIndex].year,
    month: values[currentDateIndex].month,
    day: currentDateIndex
  }));

  const dayCarouselRef = React.useRef<SwiperRef>(null);
  const weekCarouselRef = React.useRef<SwiperRef>(null);

  const daysCount = React.useRef<DaysCount>(7);

  const setDate = (date: CustomDate) => setCurrentDate(date);

  const onDayNodeScroll = () => {
    const dayNode = (dayCarouselRef.current as SwiperRef).swiper;
    const weekNode = (weekCarouselRef.current as SwiperRef).swiper;

    if (dayNode === undefined || weekNode === undefined) return;

    if (dayNode.animating) return;

    setActiveWeekNode(dayNode.activeIndex);

    setCurrentDate({
      year: values[dayNode.activeIndex].year,
      month: values[dayNode.activeIndex].month,
      day: dayNode.activeIndex
    });

    const newWeekIndex = Math.ceil((dayNode.activeIndex + 1) / daysCount.current) - 1;

    if (weekNode.realIndex !== newWeekIndex) {
      weekNode.slideTo(newWeekIndex, 400);
    }
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
            values={values}
            currentDate={currentDate}
            activeWeekNode={activeWeekNode}
            setDate={setDate}
            daysCount={daysCount}
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
