import styles from './CarouselWeek.module.css';
import { weekDays } from '@/pages/journal/constants';
import { LessonsListSkeleton } from '@/shared/modules/LessonsList';
import { Skeleton } from '@/shared/ui/Skeleton';
import { generateNumericArray } from '@/utils/helpers/generateNumericArray';
import { Swiper, SwiperSlide } from 'swiper/react';

const daysByWeeks = [generateNumericArray(7)];

export const CarouselWeekSkeleton = () => (
  <section className={styles['carousel-week']}>
    <header className={styles['navigation']}>
      <Skeleton height="1.25rem" radius="1rem" />
    </header>
    <Swiper tag="ul">
      {daysByWeeks.map((week, slideIndex) => (
        <SwiperSlide key={slideIndex} tag="li">
          <ul className={styles['carousel-week-slide']}>
            {week.map((_, dayIndex) => (
              <li key={dayIndex} className={styles['carousel-date-item']}>
                <p className={styles['day']}>{weekDays[dayIndex]}</p>
                <div className={styles['date-card']}>
                  <Skeleton radius="30%" />
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
