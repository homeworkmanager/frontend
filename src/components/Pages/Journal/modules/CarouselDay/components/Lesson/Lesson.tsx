import React from 'react';

import { convertSummary } from './helpers/convertSummary';
import styles from './Lesson.module.css';
import { LessonCard } from './LessonCard/LessonCard';
import { HContext } from '@/App/modules/HContext';
import { Modal } from '@/components/ui/Modal';
import { Typhography } from '@/components/ui/Typhography';
import clsx from 'clsx';

interface LessonProps {
  apiData: OutputClass;
  homeworks: RestructHomeworkArray;
  dayIndex: number;
  lessonIndex: number;
  updateHeight: () => void;
}

const lessonsNumbers = {
  '09:00': 1,
  '10:40': 2,
  '12:40': 3,
  '14:20': 4,
  '16:20': 5,
  '18:00': 6,
  '19:40': 7
};

const lessonColor = {
  ЛК: 'lect',
  ПР: 'pract',
  Лаб: 'lab',
  Зачет: 'zach',
  Консультация: 'cons',
  Экзамен: 'exam'
};

const convertDateToTime = (rawDate: string) => {
  const timePart = rawDate.split('T')[1];
  const [hours, minutes] = timePart.split(':');
  return `${hours}:${minutes}`;
};

const getTeacher = (rawDescrciption: string) => {
  const stageA = rawDescrciption.split('\n')[0].split(' ');
  const stageB = stageA.splice(1, stageA.length - 1);

  if (stageB[0] === undefined) return '';

  return `${stageB[0]} ${stageB[1]?.substring(0, 1)}. ${stageB[2]?.substring(0, 1)}.`;
};

export const Lesson = ({ apiData, homeworks, dayIndex, lessonIndex, updateHeight }: LessonProps) => {
  const [showInfo, setShowInfo] = React.useState(false);

  const { addHomework, removeHomework, changeHomework } = React.useContext(HContext);

  const para = apiData.class;

  const paraBegin = convertDateToTime(para.startTime);
  const paraEnd = convertDateToTime(para.endTime);

  const showDetails = () => setShowInfo((prev) => !prev);

  const addLessonHomework = (homework: RestructHomeworkElement) => {
    addHomework(homework, dayIndex, lessonIndex);
    updateHeight();
  };

  const deleteLessonHomework = (homework: RestructHomeworkElement) => {
    removeHomework(homework, dayIndex, lessonIndex);
    updateHeight();
  };

  const changeLessonHomework = (homework: RestructHomeworkElement) => {
    changeHomework(homework, dayIndex, lessonIndex);
    updateHeight();
  };

  return (
    <React.Fragment>
      <section className={styles.container} onClick={showDetails}>
        <header className={styles.header}>
          <h3 className={styles['subject']}>{convertSummary(para.summary)}</h3>
          <p className={clsx(styles['type'], styles[lessonColor[para.category as keyof typeof lessonColor]])}>
            {para.category}
          </p>
        </header>
        {homeworks.length > 0 && (
          <ol className={styles['homework-info']}>
            <h4>Задание</h4>
            {homeworks.map((homework) => (
              <li key={homework.homeworkID} className={styles['task']}>
                {homework.homeworkText}
              </li>
            ))}
          </ol>
        )}
        <article className={styles['time-info']}>
          <p>{`${lessonsNumbers[paraBegin as keyof typeof lessonsNumbers]} пара`}</p>
          <p>{`${paraBegin} - ${paraEnd}`}</p>
        </article>
        <article className={styles['cabinet-info']}>
          <Typhography tag="p" variant="additional" children={para.location} />
          <Typhography tag="p" variant="additional" children={getTeacher(para.description)} />
        </article>
      </section>
      <Modal modalId="journal" showInfo={showInfo} showDetails={showDetails}>
        <LessonCard
          apiData={apiData}
          homeworks={homeworks}
          showDetails={showDetails}
          addHomework={addLessonHomework}
          deleteHomework={deleteLessonHomework}
          changeHomework={changeLessonHomework}
        />
      </Modal>
    </React.Fragment>
  );
};
