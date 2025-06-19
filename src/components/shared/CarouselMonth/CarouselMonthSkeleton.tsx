import { LessonsListSkeleton } from '../modules/LessonsList/LessonsListSkeleton';

import styles from './CarouselMonth.module.css';
import { weekDays } from '@/components/pages/Journal/constants';
import { Skeleton } from '@/components/ui/Skeleton';
import { generateNumericArray } from '@/utils/helpers/generateNumericArray';
import { Swiper, SwiperSlide } from 'swiper/react';

const daysByMonth = [generateNumericArray(35)];

export const CarouselMonthSkeleton = () => (
  <section className={styles['carousel-month']}>
    <header className={styles['header']}>
      <div className={styles['date-container']}>
        <Skeleton height="1.5rem" radius="0.5rem" />
      </div>
      <ul className={styles['week-container']}>
        {weekDays.map((value) => (
          <li key={value} className={styles['week-day']}>
            {value}
          </li>
        ))}
      </ul>
    </header>
    <Swiper tag="ul">
      {daysByMonth.map((slide, slideIndex) => (
        <SwiperSlide tag="li" key={slideIndex}>
          <ul className={styles['month-card']}>
            {slide.map((_, dayIndex) => (
              <li key={dayIndex} className={styles['month-container']}>
                <div className={styles['day-card']}>
                  <Skeleton radius="1rem" />
                </div>
                {<LessonsListSkeleton />}
              </li>
            ))}
          </ul>
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);
