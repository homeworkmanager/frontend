/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { LessonsList } from '../modules/LessonsList/LessonsList';
import { WeekHeader } from '../modules/WeekHeader/WeekHeader';

import 'swiper/swiper-bundle.css';
import styles from './CarouselMonth.module.css';
import { firstSessionDay, monthsNumbers, weekDays } from '@/components/Pages/Journal/constants';
import { Button } from '@/components/ui/Button';
import { Slide } from '@/components/ui/Icons/Slide';
import { findDayIndex } from '@/utils/helpers/findDayIndex';
import { findIndexByDate } from '@/utils/helpers/findIndexByDate';
import { getDaysForOtherCarousels } from '@/utils/helpers/getDaysForOtherCarousels';
import clsx from 'clsx';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

interface carouselWeekProps {
  currentDate: CustomDate;
  activeMonthNode: number;
  values: ValuesDates;
  monthCarouselRef: React.RefObject<SwiperRef>;
  setClickedDate: (index: number) => void;
}

export const CarouselMonth = ({
  activeMonthNode,
  values,
  monthCarouselRef,
  currentDate,
  setClickedDate
}: carouselWeekProps) => {
  const daysByMonth = React.useMemo(() => getDaysForOtherCarousels(values, 35), []);

  const [currentSlide, dayIndexInSlide] = React.useMemo(
    () => findDayIndex(values[activeMonthNode], daysByMonth),
    [activeMonthNode, daysByMonth]
  );

  const [todaySlide, todayIndexInSlide] = React.useRef([currentSlide, dayIndexInSlide]).current;

  const currentDay = React.useRef<number>(currentDate.day);

  const onScrollClick = (dayIndex: number) => {
    setClickedDate(dayIndex);
    monthCarouselRef.current?.swiper.slideTo(Math.ceil((dayIndex + 1) / 35) - 1, 0);
  };

  React.useEffect(() => {
    currentDay.current = currentDate.day;
  }, [currentDate.day]);

  React.useEffect(() => {
    const horizontalKeyDownNavigation = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' && currentDay.current !== values.length - 1) {
        const newIndex = currentDay.current + 1;
        onScrollClick(newIndex);
      }

      if (event.key === 'ArrowLeft' && currentDay.current !== 0) {
        const newIndex = currentDay.current - 1;
        onScrollClick(newIndex);
      }
    };

    const verticalKeyDownNavigation = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' && currentDay.current > 6) {
        const newIndex = currentDay.current - 7;
        onScrollClick(newIndex);
      }

      if (event.key === 'ArrowDown' && currentDay.current < values.length - 7) {
        const newIndex = currentDay.current + 7;
        onScrollClick(newIndex);
      }
    };

    document.addEventListener('keydown', horizontalKeyDownNavigation);
    document.addEventListener('keydown', verticalKeyDownNavigation);

    return () => {
      document.removeEventListener('keydown', horizontalKeyDownNavigation);
      document.removeEventListener('keydown', verticalKeyDownNavigation);
    };
  }, []);

  return (
    <section className={styles['carousel-month']}>
      <header className={styles['header']}>
        <div className={styles['date-container']}>
          <Button className={clsx(styles['custom-prev'], 'prev')} variant="slide" rotate={true}>
            <Slide />
          </Button>
          <WeekHeader
            currentDate={values[currentDay.current]}
            firstSessionDay={firstSessionDay}
            monthsNumbers={monthsNumbers}
            variant="desktop"
          />
          <Button className={clsx(styles['custom-next'], 'next')} variant="slide">
            <Slide />
          </Button>
        </div>
        <ul className={styles['week-container']}>
          {weekDays.map((value) => (
            <li key={value} className={styles['week-day']}>
              {value}
            </li>
          ))}
        </ul>
      </header>
      <Swiper
        tag="ul"
        ref={monthCarouselRef}
        modules={[Navigation]}
        initialSlide={currentSlide}
        navigation={{ prevEl: '.prev', nextEl: '.next' }}
        speed={500}
      >
        {daysByMonth.map((slide, slideIndex) => (
          <SwiperSlide key={slideIndex} tag="li">
            <ul className={styles['month-card']}>
              {slide.map((day, dayIndex) => (
                <li
                  key={dayIndex}
                  className={styles['month-container']}
                  onClick={() => onScrollClick(findIndexByDate(values, day))}
                >
                  <div
                    className={clsx(
                      styles['day-card'],
                      todaySlide === slideIndex && todayIndexInSlide === dayIndex && styles['today'],
                      currentSlide === slideIndex && dayIndexInSlide === dayIndex && styles['active']
                    )}
                  >
                    <p>{day.day}</p>
                  </div>
                  {day.lessons.length > 0 && <LessonsList lessons={day.lessons} />}
                </li>
              ))}
            </ul>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
