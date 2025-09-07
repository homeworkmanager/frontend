import React from 'react';

import { generateValues } from '../helpers/generateValues';
import { LessonCarousel } from '../LessonCarousel';

import 'swiper/swiper-bundle.css';
import styles from './DayHomeworkDesktop.module.css';
import { UploadFile } from '@/shared/Icons/UploadFile';
import { UploadFiles } from '@/shared/modules/molecules/UploadFiles';
import { Button } from '@/shared/ui/Button';
import { Loader } from '@/shared/ui/Loader';
import { Modal } from '@/shared/ui/Modal';
import { Textarea } from '@/shared/ui/Textarea';
import { Toast } from '@/shared/ui/Toast';
import { Typhography } from '@/shared/ui/Typhography';
import { formatText } from '@/utils/helpers/formatText';
import { pad } from '@/utils/helpers/pad';
import {
  useGetSubjectsQuery,
  usePostModeratorAddHomeworkDateMutation
} from '@/utils/redux/apiSlices/schedule/scheduleApi';
import { scheduleDaysFindIndex } from '@/utils/services/scheduleDays/findIndex';
import { CarouselMonth } from '@/widgets/CarouselMonth';
import clsx from 'clsx';
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

export default function DayHomeworkDesktop() {
  const [postModeratorAddHomeworkDateMutation, postModeratorAddHomeworkDateState] =
    usePostModeratorAddHomeworkDateMutation();

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

  const [addFileModal, getAddFileModal] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>();

  const subjectRef = React.useRef<SwiperRef>(null);
  const hoursRef = React.useRef<SwiperRef>(null);
  const minutesRef = React.useRef<SwiperRef>(null);

  const monthCarouselRef = React.useRef<SwiperRef>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const activeMonthNode = React.useMemo(() => scheduleDaysFindIndex(values, homeworkDate), [homeworkDate]);

  const sendLessonHomework = async () => {
    const date = new Date(
      new Date(
        `${homeworkDate.year}-${pad(homeworkDate.month)}-${pad(homeworkDate.day)}T${deadline.hours}:${deadline.minutes}:00`.concat(
          '.000+03:00'
        )
      ).toISOString()
    );
    const isoDate = date.toISOString();

    const response = await postModeratorAddHomeworkDateMutation({
      params: {
        subjectId: homeworkId,
        homeworkText: formatText(homeworkText),
        dueDate: isoDate,
        files
      }
    });

    if (!response.error) {
      setHomeworkText('');
    }
  };

  const getSubjectsQuery = useGetSubjectsQuery(undefined);

  const onScrollSubject = () => {
    if (!getSubjectsQuery.data?.length) return;
    setHomeworkId(getSubjectsQuery.data[subjectRef.current!.swiper.realIndex].subject_id);
  };

  const onClickChooseDate = (index: number) => {
    setCurrentDate({ year: values[index].year, month: values[index].month, day: index });
    setHomeworkDate({ year: values[index].year, month: values[index].month, day: values[index].day });
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

  const addHomeworkFile = (newFiles: File[]) => {
    setFiles(() => [...newFiles]);
    getAddFileModal(false);
  };

  return (
    <article>
      <div className={styles['content']}>
        <CarouselMonth
          currentDate={currentDate}
          values={values}
          setClickedDate={onClickChooseDate}
          monthCarouselRef={monthCarouselRef}
          activeMonthNode={activeMonthNode}
        />
        <div className={styles['add-homework']}>
          <div className={styles['container']}>
            <Textarea
              value={homeworkText}
              onChange={(e) => setHomeworkText(e.target.value)}
              label="Добавить задание"
              name="homeworkText"
            />
          </div>
          <LessonCarousel
            subjects={getSubjectsQuery.data}
            getSubjectsState={{
              isLoading: getSubjectsQuery.isLoading,
              isSuccess: getSubjectsQuery.isSuccess,
              isError: getSubjectsQuery.isError
            }}
            onElemClick={onElemClick}
            onScrollSubject={onScrollSubject}
            subjectRef={subjectRef}
            homeworkId={homeworkId}
          />
          <div className={styles['container']}>
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
          </div>
          <div className={styles['accept']}>
            <Button
              variant="accept"
              className={styles['submit']}
              disabled={postModeratorAddHomeworkDateState.isLoading || !homeworkText}
              onClick={sendLessonHomework}
            >
              {postModeratorAddHomeworkDateState.isLoading ? <Loader /> : 'Добавить'}
            </Button>
            <div className={styles['add-file']}>
              <Button variant="logo" onClick={() => getAddFileModal(true)}>
                <UploadFile />
              </Button>
            </div>
            <Modal showInfo={addFileModal} showDetails={() => getAddFileModal(false)}>
              <UploadFiles addHomeworkFile={addHomeworkFile} onClose={() => getAddFileModal(false)} />
            </Modal>
          </div>
          {(postModeratorAddHomeworkDateState.isSuccess || postModeratorAddHomeworkDateState.isError) && (
            <Toast
              type="desktop"
              text={postModeratorAddHomeworkDateState.isSuccess ? 'Задание добавлено' : 'Ошибка добавления задания'}
            />
          )}
        </div>
      </div>
    </article>
  );
}
