import React from 'react';

import { convertSummary } from './helpers/convertSummary';
import styles from './Lesson.module.css';
import { LessonCard } from './LessonCard/LessonCard';
import { Modal } from '@/components/ui/Modal';
import { Typhography } from '@/components/ui/Typhography';
import clsx from 'clsx';

interface LessonProps {
  apiData: OutputClass;
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

export const Lesson = ({ apiData, updateHeight }: LessonProps) => {
  const [showInfo, setShowInfo] = React.useState(false);

  const para = apiData.class;
  const [homeworks, setHomeworks] = React.useState<RestructHomeworkArray>(
    apiData.homework.map((value) => {
      return { homeworkText: value.homeworkText, homeworkID: value.homeworkID };
    })
  );

  const paraBegin = convertDateToTime(para.startTime);
  const paraEnd = convertDateToTime(para.endTime);

  const showDetails = () => setShowInfo((prev) => !prev);

  const addHomework = (homework: RestructHomeworkElement) => {
    setHomeworks((prev) => [...prev, homework]);
    updateHeight();
  };

  const deleteHomework = (id: number) => {
    setHomeworks((prev) => prev.filter((homework) => homework.homeworkID !== id));
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
          addHomework={addHomework}
          deleteHomework={deleteHomework}
        />
      </Modal>
    </React.Fragment>
  );
};
