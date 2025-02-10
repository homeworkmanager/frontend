import React from 'react';

import 'swiper/swiper-bundle.css';
import styles from './CarouselDay.module.css';
import { FreeDay } from './components/FreeDay/FreeDay';
import { IndependentHomework } from './components/IndependentHomework/IndependentHomework';
import { Lesson } from './components/Lesson/Lesson';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

interface CarouselDayProps extends React.ComponentProps<'div'> {
  currentDateIndex: number;
  apiDates: DaySchedule[];
  onDayNodeScroll: () => void;
  dayCarouselRef: React.RefObject<SwiperRef>;
}

export const CarouselDay = ({
  currentDateIndex,
  apiDates,
  onDayNodeScroll,
  dayCarouselRef,
  ...props
}: CarouselDayProps) => {
  const updateHeight = () => {
    if (dayCarouselRef.current) {
      dayCarouselRef.current.swiper.wrapperEl.style.height = 'auto';
    }
  };

  return (
    <section {...props}>
      <Swiper
        tag="ul"
        ref={dayCarouselRef}
        freeMode={false}
        onSwiper={updateHeight}
        initialSlide={currentDateIndex}
        onSlideChange={onDayNodeScroll}
        className={styles['swiper-env']}
      >
        {apiDates.map((apiData, dayIndex) => (
          <SwiperSlide key={dayIndex} tag="li" className={styles['swiper-layout']}>
            <div className={styles['day-card']}>
              {apiData.outputClasses.length === 0 && <FreeDay />}
              {apiData.outputClasses.length > 0 &&
                apiData.outputClasses.map((value) => (
                  <Lesson
                    key={value.class.startTime}
                    apiData={value}
                    Homeworks={value.homework}
                    updateHeight={updateHeight}
                  />
                ))}
              <IndependentHomework Homeworks={apiData.independentHomeworks} updateHeight={updateHeight} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
