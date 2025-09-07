import React from 'react';

import { CarouselDay } from '../components/CarouselDay/CarouselDay';
import { useRestructSheduleData } from '../hooks/useRestructSheduleData';

import styles from './JournalMobile.module.css';
import { JournalMobileLoading } from './JournalMobileLoading';
import { CarouselWeek } from '@/widgets/CarouselWeek';
import { SwiperRef } from 'swiper/react';

export default function JournalMobile() {
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
    const dayNode = dayCarouselRef.current?.swiper;
    const weekNode = weekCarouselRef.current?.swiper;

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
      dayCarouselRef.current?.swiper.slideTo(index, 0);
    }
  };

  return (
    <article className={styles['container']}>
      {getScheduleStatus.loading && <JournalMobileLoading />}
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
}
