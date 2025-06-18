import styles from './LessonCarousel.module.css';
import { Typhography } from '@/components/ui/Typhography';
import clsx from 'clsx';
import { Mousewheel } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

interface LessonCarouselProps {
  subjects: GetSubjectsResponse | undefined;
  getSubjectsState: { isLoading: boolean; isSuccess: boolean; isError: boolean };
  onElemClick: (currentRef: React.RefObject<SwiperRef>, index: number) => void;
  onScrollSubject: () => void;
  subjectRef: React.RefObject<SwiperRef>;
  homeworkId: number;
}

export const LessonCarousel = ({
  subjects,
  getSubjectsState,
  onElemClick,
  onScrollSubject,
  subjectRef,
  homeworkId
}: LessonCarouselProps) => {
  return (
    <article className={styles['subjects']}>
      <Typhography tag="h3" variant="thirdy" className={styles['title']} children={`Предмет`} />
      {(getSubjectsState.isLoading || getSubjectsState.isError) && <div className={styles['swiper-container']} />}
      {getSubjectsState.isSuccess && (
        <Swiper
          ref={subjectRef}
          direction="vertical"
          slidesPerView={3}
          spaceBetween={10}
          loop={true}
          tag="ul"
          onSlideChange={onScrollSubject}
          centeredSlides={true}
          modules={[Mousewheel]}
          mousewheel={{
            sensitivity: 4,
            forceToAxis: true,
            releaseOnEdges: true,
            thresholdTime: 100
          }}
          className={styles['swiper-container']}
        >
          {subjects?.map((subject, index) => (
            <SwiperSlide
              tag="li"
              key={subject.subject_id}
              className={clsx(
                styles['swiper-elem'],
                styles['subjects-padd'],
                homeworkId === subject.subject_id && styles['active']
              )}
              onClick={() => onElemClick(subjectRef, index)}
            >
              <Typhography tag="p" variant="thirdy" className={styles['text']} children={subject.subject_name} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </article>
  );
};
