import React from 'react';

import 'swiper/swiper-bundle.css';
import styles from './CarouselDay.module.css';
import { FreeDay } from './components/FreeDay/FreeDay';
import { IndependentHomework } from './components/IndependentHomework/IndependentHomework';
import { Lesson } from './components/Lesson/Lesson';
import { HContext } from '@/App/modules/HContext';
import { IHContext } from '@/App/modules/IHContext';
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

  const { independentHomeworks } = React.useContext(IHContext);
  const { homeworks } = React.useContext(HContext);

  return (
    <section {...props}>
      <Swiper
        tag="ul"
        ref={dayCarouselRef}
        lazyPreloadPrevNext={14}
        freeMode={true}
        onSwiper={updateHeight}
        initialSlide={currentDateIndex}
        onSlideChange={onDayNodeScroll}
        autoHeight={true}
        className={styles['swiper-env']}
      >
        {apiDates.map((apiData, dayIndex) => (
          <SwiperSlide key={dayIndex} tag="li" className={styles['swiper-layout']}>
            <div className={styles['day-card']}>
              {apiData.outputClasses.length === 0 && <FreeDay />}
              {homeworks.length > 0 &&
                apiData.outputClasses.map((value, lessonIndex) => (
                  <Lesson
                    key={value.class.startTime}
                    apiData={value}
                    homeworks={homeworks[dayIndex][lessonIndex]}
                    dayIndex={dayIndex}
                    lessonIndex={lessonIndex}
                    updateHeight={updateHeight}
                  />
                ))}
              <IndependentHomework
                Index={dayIndex}
                Homeworks={independentHomeworks[dayIndex]}
                updateHeight={updateHeight}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
