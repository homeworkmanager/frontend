/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { LessonsList } from '../modules/LessonsList/LessonsList';
import { WeekHeader } from '../modules/WeekHeader/WeekHeader';

import 'swiper/swiper-bundle.css';
import styles from './CarouselMonth.module.css';
import { firstSessionDay, monthsNumbers, weekDays } from '@/components/Pages/Journal/constants';
import { Button } from '@/components/ui/Button';
import { findDayIndex } from '@/utils/helpers/findDayIndex';
import { findIndexByDate } from '@/utils/helpers/findIndexByDate';
import { getDaysForOtherCarousels } from '@/utils/helpers/getDaysForOtherCarousels';
import clsx from 'clsx';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Slide } from '@/components/ui/Icons/Slide';

import { Navigation } from 'swiper/modules';

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
  setClickedDate,
}: carouselWeekProps) => {
  const daysByMonth = React.useMemo(() => getDaysForOtherCarousels(values, 35), []);

  const [currentSlide, dayIndexInSlide] = React.useMemo(
    () => findDayIndex(values[activeMonthNode], daysByMonth),
    [activeMonthNode, daysByMonth]
  );

  const [todaySlide, todayIndexInSlide] = React.useRef([currentSlide, dayIndexInSlide]).current;

  const onScrollClick = (dayIndex: number) => {
    setClickedDate(dayIndex);
  };

  return (
    <section className={styles['carousel-month']}>
      <header className={styles['header']}>
        <div className={styles['date-container']}>
          <Button className={clsx(styles["custom-prev"], "prev")} variant="slide" rotate={true}>
            <Slide />
          </Button>
          <WeekHeader
            currentDate={values[currentDate.day]}
            firstSessionDay={firstSessionDay}
            monthsNumbers={monthsNumbers}
            variant="desktop"
          />
          <Button className={clsx(styles["custom-next"], "next")} variant="slide">
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
        {daysByMonth.map((value, slideIndex) => (
          <SwiperSlide key={slideIndex} tag="li">
            <ul className={styles['month-card']}>
              {value.map((value, dayIndex) => (
                <li
                  key={dayIndex}
                  className={styles['month-container']}
                  onClick={() => onScrollClick(findIndexByDate(values, value))}
                >
                  <div
                    className={clsx(
                      styles['day-card'],
                      todaySlide === slideIndex && todayIndexInSlide === dayIndex && styles['today'],
                      currentSlide === slideIndex && dayIndexInSlide === dayIndex && styles['active']
                    )}
                  >
                    <p>{value.day}</p>
                  </div>
                  {value.lessons.length > 0 && <LessonsList lessons={value.lessons} />}
                </li>
              ))}
            </ul>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
