import styles from './CarouselDay.module.css';
import { LessonSkeleton } from './molecules/Lesson/LessonSkeleton';
import { generateNumericArray } from '@/utils/helpers/generateNumericArray';
import { Swiper, SwiperSlide } from 'swiper/react';

const lessons = generateNumericArray(3);

export const CarouselDaySkeleton = ({ ...props }: React.ComponentProps<'section'>) => (
  <section {...props} style={{ width: '100%' }}>
    <Swiper tag="ul" className={styles['swiper-env']}>
      <SwiperSlide tag="li" className={styles['swiper-layout']}>
        <div className={styles['day-card']}>
          {lessons.map((lesson) => (
            <LessonSkeleton key={lesson} />
          ))}
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
);
