/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { LessonsList } from '../modules/LessonsList/LessonsList';
import { WeekHeader } from '../modules/WeekHeader/WeekHeader';

import 'swiper/swiper-bundle.css';
import styles from './CarouselMonth.module.css';
import { firstSessionDay, monthData, monthsNumbers, weekDays } from '@/components/Pages/Journal/constants';
import { Button } from '@/components/ui/Button';
import { createfirstMonthsNodes } from '@/utils/helpers/createfirstMonthsNodes';
import { findDayIndex } from '@/utils/helpers/findDayIndex';
import { findIndexByDate } from '@/utils/helpers/findIndexByDate';
import { getDaysForOtherCarousels } from '@/utils/helpers/getDaysForOtherCarousels';
import { useDropdown } from '@/utils/hooks/useDropdown';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

interface carouselWeekProps {
  currentDate: CustomDate;
  activeMonthNode: number;
  values: ValuesDates;
  monthCarouselRef: React.RefObject<SwiperRef>;
  moderator?: boolean;
  setClickedDate: (index: number) => void;
}

export const CarouselMonth = ({
  activeMonthNode,
  values,
  monthCarouselRef,
  currentDate,
  setClickedDate,
  moderator = false
}: carouselWeekProps) => {
  const daysByMonth = React.useMemo(() => getDaysForOtherCarousels(values, 35), []);

  const [currentSlide, dayIndexInSlide] = React.useMemo(
    () => findDayIndex(values[activeMonthNode], daysByMonth),
    [activeMonthNode, daysByMonth]
  );

  const firstMonthsNodes = React.useMemo(() => createfirstMonthsNodes(values), []);

  const { menuRef, isOpen, action } = useDropdown();

  const [todaySlide, todayIndexInSlide] = React.useRef([currentSlide, dayIndexInSlide]).current;

  const onDropDownClick = () => {
    action.toggle();
  };

  const onScrollClick = (dayIndex: number) => {
    setClickedDate(dayIndex);
    action.close();
  };

  const onDropDownScroll = (dayIndex: number) => {
    if (moderator) {
      monthCarouselRef.current?.swiper.slideTo(Math.ceil((dayIndex + 1) / 35 - 1), 0);
    }
    onScrollClick(dayIndex);
  };

  return (
    <section className={styles['carousel-month']}>
      <header className={styles['header']}>
        <div className={styles['date-container']}>
          <WeekHeader
            currentDate={values[currentDate.day]}
            firstSessionDay={firstSessionDay}
            monthsNumbers={monthsNumbers}
            variant="desktop"
          />
          <div className={styles['dropdown']} ref={menuRef}>
            <Button
              children={`${monthData[daysByMonth[currentSlide][dayIndexInSlide]?.month]}`}
              className={clsx(styles['dropdown-btn'], isOpen && styles['dropdown-active'])}
              onClick={onDropDownClick}
            />
            <AnimatePresence>
              {isOpen && (
                <motion.ul
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className={styles['dropdown-content']}
                >
                  {firstMonthsNodes.map((value, index) => (
                    <li key={index} className={styles['dropdown-item']} onClick={() => onDropDownScroll(value[1])}>
                      {monthData[value[0]]}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
        <ul className={styles['week-container']}>
          {weekDays.map((value, index) => (
            <li key={index} className={styles['week-day']}>
              {value}
            </li>
          ))}
        </ul>
      </header>
      <Swiper tag="ul" ref={monthCarouselRef} initialSlide={currentSlide} speed={500}>
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
