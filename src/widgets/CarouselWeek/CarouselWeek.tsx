/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import 'swiper/swiper-bundle.css';
import styles from './CarouselWeek.module.css';
import { weekDays } from '@/pages/journal/constants';
import { Slide } from '@/shared/Icons/Slide';
import { LessonsList } from '@/shared/modules/LessonsList';
import { WeekHeader } from '@/shared/modules/WeekHeader';
import { Button } from '@/shared/ui/Button';
import { scheduleDaysFindIndex } from '@/utils/services/scheduleDays/findIndex';
import { scheduleMatrixFindIndexes } from '@/utils/services/scheduleMatrix/findIndexes';
import { scheduleMatrixCreate } from '@/utils/services/scheduleMatrix/generate';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { Navigation, Virtual } from 'swiper/modules';
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
  const [daysByWeeks, setDaysByWeeks] = React.useState(() => scheduleMatrixCreate(values, daysCount.current));

  const [currentSlide, dayIndexInSlide] = React.useMemo(
    () => scheduleMatrixFindIndexes(values[activeWeekNode], daysByWeeks),
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

    setDaysByWeeks(() => scheduleMatrixCreate(values, newDaysCount));

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

  const slideVariants = (index: number) => ({
    hidden: {
      x: 300,
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'tween', duration: 0.35, delay: index * 0.03 }
    }
  });

  return (
    <section className={styles['carousel-week']}>
      <header className={styles['navigation']}>
        <Button className="custom-prev" variant="logo" rotate>
          <Slide />
        </Button>
        <WeekHeader currentDate={values[currentDate.day]} variant="mobile" />
        <Button className="custom-next" variant="logo">
          <Slide />
        </Button>
      </header>
      <Swiper
        tag="ul"
        ref={weekCarouselRef}
        modules={[Navigation, Virtual]}
        virtual={{
          slides: daysByWeeks,
          cache: true,
          addSlidesAfter: 0,
          addSlidesBefore: 0,
          renderExternal: ({ slides }) => {
            if (slides.length !== daysByWeeks.length) {
              return { slides: daysByWeeks };
            }
            return null;
          }
        }}
        onSlideChange={onWeekNodeScroll}
        initialSlide={currentSlide}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev'
        }}
        speed={500}
        resistanceRatio={0.7}
      >
        <AnimatePresence>
          {daysByWeeks.map((week, slideIndex) => (
            <SwiperSlide key={slideIndex} tag="li">
              <motion.ul key={`${slideIndex}-${daysCount.current}`} className={styles['carousel-week-slide']}>
                {week.map((day, dayIndex) => (
                  <motion.li
                    key={`${day.year} ${day.month} ${day.day}`}
                    className={styles['carousel-date-item']}
                    onClick={() => setClickedDate(scheduleDaysFindIndex(values, day))}
                    {...(slideIndex === weekCarouselRef.current?.swiper.realIndex &&
                      dayIndex >= 7 && {
                        initial: 'hidden',
                        animate: 'visible',
                        variants: slideVariants(dayIndex)
                      })}
                  >
                    <motion.p className={styles['day']}>{weekDays[dayIndex]}</motion.p>
                    <motion.div
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
                    </motion.div>
                    {<LessonsList lessons={day.lessons} />}
                  </motion.li>
                ))}
              </motion.ul>
            </SwiperSlide>
          ))}
        </AnimatePresence>
      </Swiper>
      <Button variant="logo" className={styles['change-view']} children={<Slide />} onClick={changeWeekCarouselView} />
    </section>
  );
};
