import styles from './LessonCarousel.module.css';
import { Skeleton } from '@/shared/ui/Skeleton';
import { generateNumericArray } from '@/utils/helpers/generateNumericArray';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';

const subjects = generateNumericArray(5);

export const LessonCarouselSkeleton = () => (
  <Swiper
    direction="vertical"
    slidesPerView={3}
    spaceBetween={10}
    tag="ul"
    centeredSlides={true}
    loop={true}
    className={styles['swiper-container']}
  >
    {subjects.map((_, index) => (
      <SwiperSlide tag="li" key={index} className={clsx(styles['swiper-elem'], styles['subjects-padd'])}>
        <Skeleton radius="0.75rem" className={styles['text']} />
      </SwiperSlide>
    ))}
  </Swiper>
);
