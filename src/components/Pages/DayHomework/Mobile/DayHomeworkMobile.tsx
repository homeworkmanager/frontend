import React from 'react';

import { LessonCarousel } from '../../../shared/LessonCarousel/LessonCarousel';
import { generateValues } from '../helpers/generateValues';
import { SendHomework } from '../modules/SendHomework/SendHomework';

import 'swiper/swiper-bundle.css';
import styles from './DayHomeworkMobile.module.css';
import { CarouselWeek } from '@/components/shared/CarouselWeek/CarouselWeek';
import { Header } from '@/components/shared/Header/Header';
import { Input } from '@/components/ui/Input';
import { Typhography } from '@/components/ui/Typhography';
import { findIndexByDate } from '@/utils/helpers/findIndexByDate';
import { usePostModeratorAddHomeworkDateMutation } from '@/utils/redux/apiSlices/scheduleApiSlice/scheduleApi';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Mousewheel } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

const minutes: string[] = [];
const hours: string[] = [];

for (let i = 0; i < 60; i++) {
  minutes.push(String(i).padStart(2, '0'));
  if (i < 24) {
    hours.push(String(i).padStart(2, '0'));
  }
}

export const DayHomeworkMobile = () => {
  const [postModeratorAddHomeworkDateMutation, postAddHomeworkStatusState] = usePostModeratorAddHomeworkDateMutation();

  const { values, currentDateIndex } = generateValues();

  const [currentDate, setCurrentDate] = React.useState(() => ({
    year: values[currentDateIndex].year,
    month: values[currentDateIndex].month,
    day: currentDateIndex
  }));

  const [homeworkText, setHomeworkText] = React.useState('');
  const [homeworkId, setHomeworkId] = React.useState(1);
  const [homeworkDate, setHomeworkDate] = React.useState(() => ({
    ...currentDate,
    day: values[currentDateIndex].day
  }));
  const [deadline, setDeadline] = React.useState(() => ({
    minutes: '00',
    hours: '00'
  }));

  const subjectRef = React.useRef<SwiperRef>(null);
  const hoursRef = React.useRef<SwiperRef>(null);
  const minutesRef = React.useRef<SwiperRef>(null);

  const weekCarouselRef = React.useRef<SwiperRef>(null);

  const activeWeekNode = React.useMemo(() => findIndexByDate(values, homeworkDate), [homeworkDate]);

  const sendLessonHomework = async () => {
    const date = new Date(
      homeworkDate.year,
      homeworkDate.month - 1,
      homeworkDate.day + 1,
      Number(deadline.hours),
      Number(deadline.minutes)
    );
    const isoDate = date.toISOString();

    await postModeratorAddHomeworkDateMutation({
      params: {
        subjectId: homeworkId,
        homeworkText: homeworkText,
        dueDate: isoDate
      }
    });
  };

  const onScrollSubject = () => {
    setHomeworkId(subjectRef.current!.swiper.realIndex + 1);
  };

  const onClickChooseDate = (index: number) => {
    setCurrentDate({ year: values[index].year, month: values[index].month, day: index });
    setHomeworkDate({ year: values[index].year, month: values[index].month, day: values[index].day });
  };

  const onWeekNodeScroll = () => {
    const weekNodeIndex = (weekCarouselRef.current as SwiperRef).swiper.realIndex;

    if (weekNodeIndex * 7 <= activeWeekNode && weekNodeIndex * 7 + 6 > activeWeekNode) {
      setCurrentDate({
        year: values[activeWeekNode].year,
        month: values[activeWeekNode].month,
        day: activeWeekNode
      });
      return;
    }

    setCurrentDate({
      year: values[weekNodeIndex * 7 + 6].year,
      month: values[weekNodeIndex * 7 + 6].month,
      day: weekNodeIndex * 7 + 6
    });
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
      <Header />
      <article className={styles['container']}>
        <Input
          onChange={(e) => setHomeworkText(e.target.value)}
          label="Добавить задание"
          variant="homework"
          name="homeworkText"
        />
      </article>

      <CarouselWeek
        currentDate={currentDate}
        values={values}
        onWeekNodeScroll={onWeekNodeScroll}
        setClickedDate={onClickChooseDate}
        weekCarouselRef={weekCarouselRef}
        activeWeekNode={activeWeekNode}
      />

      <LessonCarousel
        onElemClick={onElemClick}
        onScrollSubject={onScrollSubject}
        subjectRef={subjectRef}
        homeworkId={homeworkId}
      />
      <article className={styles['container']}>
        <Typhography tag="h3" variant="thirdy" className={styles['section-title']} children={`Дедлайн`} />
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
                className={clsx(styles['swiper-elem'], deadline.hours === value && styles['deadline-active'])}
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
                className={clsx(styles['swiper-elem'], deadline.minutes === value && styles['deadline-active'])}
                onClick={() => onElemClick(minutesRef, index)}
              >
                <Typhography tag="p" variant="thirdy" children={value} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </article>
      <SendHomework
        isLoading={postAddHomeworkStatusState.isLoading}
        isError={postAddHomeworkStatusState.isError}
        homeworkText={homeworkText}
        addHomework={sendLessonHomework}
      />
    </motion.aside>
  );
};
