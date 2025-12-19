import React from 'react';
import { Outlet } from 'react-router-dom';

import 'swiper/swiper-bundle.css';
import styles from './CarouselDay.module.css';
import { FreeDay } from './modules/FreeDay';
import { IndependentHomework } from './modules/IndependentHomework';
import { Lesson } from './modules/Lesson';
import { Virtual } from 'swiper/modules';
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
  return (
    <>
      <section {...props}>
        <Swiper
          tag="ul"
          ref={dayCarouselRef}
          modules={[Virtual]}
          virtual={{ slides: apiDates }}
          slidesPerView={1}
          initialSlide={currentDateIndex}
          onSlideChange={onDayNodeScroll}
          autoHeight={true}
          speed={400}
          observer={true}
          className={styles['swiper-env']}
        >
          {apiDates.map((apiData, dayIndex) => (
            <SwiperSlide key={dayIndex} virtualIndex={dayIndex} tag="li" className={styles['swiper-layout']}>
              <div className={styles['day-card']}>
                {apiData.outputClasses.length === 0 && <FreeDay />}
                {apiData.outputClasses.length > 0 &&
                  apiData.outputClasses.map((value) => <Lesson key={value.class.startTime} apiData={value} />)}
                <IndependentHomework Homeworks={apiData.independentHomeworks} dayCarouselRef={dayCarouselRef} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <Outlet context={{ dayCarouselRef }} />
    </>
  );
};
