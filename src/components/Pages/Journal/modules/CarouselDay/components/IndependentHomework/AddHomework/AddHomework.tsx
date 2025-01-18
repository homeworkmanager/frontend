import React from 'react';

import 'swiper/swiper-bundle.css';
import styles from './AddHomework.module.css';
import { Button } from '@/components/ui/Button';
import { Slide } from '@/components/ui/Icons/Slide';
import { Input } from '@/components/ui/Input';
import { Loader } from '@/components/ui/Loader';
import { Typhography } from '@/components/ui/Typhography';
import {
  useGetSubjectsQuery,
  usePostModeratorAddHomeworkDateMutation
} from '@/utils/redux/apiSlices/moderatorApiSlice/moderatorApi';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Mousewheel } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

interface AddHomeworkProps {
  currentValue: ValuesDate;
  addHomework: (homework: HomeworkElement) => void;
  onClose: () => void;
}

const minutes: string[] = [];
const hours: string[] = [];

for (let i = 0; i < 60; i++) {
  minutes.push(String(i).padStart(2, '0'));
  if (i < 24) {
    hours.push(String(i).padStart(2, '0'));
  }
}

export const AddHomework = ({ currentValue, addHomework, onClose }: AddHomeworkProps) => {
  const { data, isSuccess } = useGetSubjectsQuery(undefined);
  const [postModeratorAddHomeworkDateMutation, { isLoading, isError }] = usePostModeratorAddHomeworkDateMutation();
  const [homeworkText, setHomeworkText] = React.useState('');
  const [homeworkId, setHomeworkId] = React.useState(1);
  const [deadline, setDeadline] = React.useState({
    minutes: '00',
    hours: '00'
  });

  const subjectRef = React.useRef<SwiperRef>(null);
  const hoursRef = React.useRef<SwiperRef>(null);
  const minutesRef = React.useRef<SwiperRef>(null);

  const sendLessonHomework = async () => {
    const date = new Date(
      currentValue.year,
      currentValue.month - 1,
      currentValue.day + 1,
      Number(deadline.hours),
      Number(deadline.minutes)
    );
    const isoDate = date.toISOString();

    const postModeratorAddHomeworkDateResponse = await postModeratorAddHomeworkDateMutation({
      params: {
        subjectId: homeworkId,
        homeworkText: homeworkText,
        dueDate: isoDate
      }
    });
    if (!postModeratorAddHomeworkDateResponse.error) {
      addHomework({ homeworkText: homeworkText, homeworkID: postModeratorAddHomeworkDateResponse.data.homework_id });
    }
  };

  const onScrollSubject = () => {
    setHomeworkId(subjectRef.current!.swiper.realIndex + 1);
  };

  const onScrollHours = () => {
    setDeadline({ ...deadline, hours: hours[hoursRef.current!.swiper.realIndex] });
  };

  const onScrollMinutes = () => {
    setDeadline({ ...deadline, minutes: minutes[minutesRef.current!.swiper.realIndex] });
  };

  const onElemClick = (currentRef: React.RefObject<SwiperRef>, index: number) => {
    currentRef.current?.swiper.slideToLoop(index);
  };

  return (
    <motion.aside
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{
        duration: 0.35,
        ease: 'easeInOut'
      }}
      className={styles['layout']}
    >
      <header className={styles['header']}>
        <Button variant="slide" rotate={true} className={styles['close']} onClick={onClose}>
          <Slide />
        </Button>
        <Typhography tag="h3" variant="secondary" children={`Добавить задание`} />
      </header>
      <article>
        <Input
          onChange={(e) => setHomeworkText(e.target.value)}
          label="Добавить задание"
          variant="homework"
          name={`${currentValue.day} ${currentValue.month} ${currentValue.year}`}
        />
      </article>
      {isSuccess && !!data.length && (
        <article className={styles['subjects']}>
          <Typhography tag="h3" variant="thirdy" children={`Предмет`} />
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
            {data.map((subject, index) => (
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
                <Typhography tag="p" variant="thirdy" children={subject.subject_name} />
              </SwiperSlide>
            ))}
          </Swiper>
        </article>
      )}
      <article className={styles['subjects']}>
        <Typhography tag="h3" variant="thirdy" children={`Дедлайн`} />
        <div className={styles['deadline']}>
          <Swiper
            ref={hoursRef}
            direction="vertical"
            slidesPerView={5}
            spaceBetween={10}
            loop={true}
            tag="ul"
            onSlideChange={onScrollHours}
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
            {hours.map((value, index) => (
              <SwiperSlide
                tag="li"
                key={value}
                className={clsx(
                  styles['swiper-elem'],
                  styles['deadline-padd'],
                  deadline.hours === value && styles['active'] && styles['deadline-active']
                )}
                onClick={() => onElemClick(hoursRef, index)}
              >
                <Typhography tag="p" variant="thirdy" children={value} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={styles['test']}>
            <p>:</p>
          </div>
          <Swiper
            ref={minutesRef}
            direction="vertical"
            slidesPerView={5}
            spaceBetween={10}
            loop={true}
            tag="ul"
            onSlideChange={onScrollMinutes}
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
            {minutes.map((value, index) => (
              <SwiperSlide
                tag="li"
                key={value}
                className={clsx(
                  styles['swiper-elem'],
                  styles['deadline-padd'],
                  deadline.minutes === value && styles['active'] && styles['deadline-active']
                )}
                onClick={() => onElemClick(minutesRef, index)}
              >
                <Typhography tag="p" variant="thirdy" children={value} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </article>
      <>
        <Button variant="accept" disabled={isLoading || !homeworkText} onClick={sendLessonHomework}>
          {isLoading ? <Loader /> : 'Добавить'}
        </Button>
        {isError && (
          <Typhography tag="p" variant="thirdy">
            Ошибка
          </Typhography>
        )}
      </>
    </motion.aside>
  );
};
