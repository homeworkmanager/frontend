/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { LessonsList } from '../modules/LessonsList/LessonsList';
import { WeekHeader } from '../modules/WeekHeader/WeekHeader';

import 'swiper/swiper-bundle.css';
import styles from './CarouselWeek.module.css';
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
  activeWeekNode: number;
  values: ValuesDates;
  setDate: (date: CustomDate) => void;
  setClickedDate: (index: number) => void;
  daysCount: React.MutableRefObject<DaysCount>;
  weekCarouselRef: React.RefObject<SwiperRef>;
}

export const CarouselWeek = ({
  currentDate,
  activeWeekNode,
  values,
  setDate,
  daysCount,
  weekCarouselRef,
  setClickedDate
}: carouselWeekProps) => {
  const [daysByWeeks, setDaysByWeeks] = React.useState(() => getDaysForOtherCarousels(values, daysCount.current));

  const [currentSlide, dayIndexInSlide] = React.useMemo(
    () => findDayIndex(values[activeWeekNode], daysByWeeks),
    [activeWeekNode, daysByWeeks]
  );

  const initialParams = React.useRef({ currentSlide, dayIndexInSlide });
  const transitionStatus = React.useRef(true);

  const onWeekNodeScroll = () => {
    const weekNodeIndex = (weekCarouselRef.current as SwiperRef).swiper.realIndex;

    if (
      weekNodeIndex * daysCount.current <= activeWeekNode &&
      weekNodeIndex * daysCount.current + (daysCount.current === 7 ? 6 : 13) >= activeWeekNode
    ) {
      setDate({
        year: values[activeWeekNode].year,
        month: values[activeWeekNode].month,
        day: activeWeekNode
      });
      return;
    }

    setDate({
      year: values[weekNodeIndex * daysCount.current].year,
      month: values[weekNodeIndex * daysCount.current].month,
      day: weekNodeIndex * daysCount.current
    });
  };

  const updateInitialParams = (newDaysCount: number) => {
    if (newDaysCount === 14) {
      initialParams.current = {
        currentSlide: initialParams.current.currentSlide / 2,
        dayIndexInSlide:
          initialParams.current.currentSlide % 2 === 0
            ? initialParams.current.dayIndexInSlide
            : initialParams.current.dayIndexInSlide + 7
      };
      return;
    }

    initialParams.current = {
      currentSlide: initialParams.current.currentSlide * 2,
      dayIndexInSlide:
        initialParams.current.dayIndexInSlide > 6
          ? initialParams.current.dayIndexInSlide - 7
          : initialParams.current.dayIndexInSlide
    };
  };

  const changeWeekCarouselView = () => {
    transitionStatus.current = false;

    const weekNodeIndex = (weekCarouselRef.current as SwiperRef).swiper.realIndex;
    const newDaysCount = daysCount.current === 7 ? 14 : 7;

    updateInitialParams(newDaysCount);

    setDaysByWeeks(() => getDaysForOtherCarousels(values, newDaysCount));

    daysCount.current = newDaysCount;

    if (newDaysCount === 7) return;

    const targetSlideIndex = weekNodeIndex / 2;
    weekCarouselRef.current?.swiper.slideTo(targetSlideIndex, 0);
  };

  React.useLayoutEffect(() => {
    if (transitionStatus.current === false) transitionStatus.current = true;

    if (daysCount.current === 14) return;

    const targetSlideIndex = currentDate.day / 7;
    weekCarouselRef.current?.swiper.slideTo(targetSlideIndex, 0);
  }, [daysCount.current]);

  return (
    <section className={styles['carousel-week']}>
      <header className={styles['navigation']}>
        <Button className="custom-prev" variant="slide" rotate>
          <Slide />
        </Button>
        <WeekHeader
          currentDate={values[currentDate.day]}
          firstSessionDay={firstSessionDay}
          monthsNumbers={monthsNumbers}
          variant="mobile"
        />
        <Button className="custom-next" variant="slide">
          <Slide />
        </Button>
      </header>
      <Swiper
        tag="ul"
        ref={weekCarouselRef}
        onSlideChange={onWeekNodeScroll}
        lazyPreloadPrevNext={20}
        initialSlide={currentSlide}
        freeMode={true}
        modules={[Navigation]}
        speed={500}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev'
        }}
      >
        {daysByWeeks.map((week, slideIndex) => (
          <SwiperSlide key={slideIndex} tag="li">
            <ul className={styles['carousel-week-slide']}>
              {week.map((day, dayIndex) => (
                <li
                  key={dayIndex}
                  className={styles['carousel-date-item']}
                  onClick={() => setClickedDate(findIndexByDate(values, day))}
                >
                  <p className={styles['day']}>{weekDays[dayIndex]}</p>
                  <div
                    className={clsx(
                      styles['date-card'],
                      transitionStatus.current && styles['bg-transition'],
                      Math.floor(initialParams.current.currentSlide) === slideIndex &&
                        initialParams.current.dayIndexInSlide === dayIndex &&
                        styles['today'],
                      currentSlide === slideIndex && dayIndexInSlide === dayIndex && styles['active']
                    )}
                  >
                    <p className={styles['date']}>{day.day}</p>
                  </div>
                  {day.lessons.length > 0 && <LessonsList lessons={day.lessons} />}
                </li>
              ))}
            </ul>
          </SwiperSlide>
        ))}
      </Swiper>
      <Button variant="slide" className={styles['change-view']} children={<Slide />} onClick={changeWeekCarouselView} />
    </section>
  );
};
