import { useNavigate } from 'react-router-dom';

import styles from './Lesson.module.css';
import { Typhography } from '@/components/ui/Typhography';
import { convertDateToTime } from '@/utils/helpers/convertDateToTime';
import { convertSummary } from '@/utils/helpers/convertSummary';
import clsx from 'clsx';

interface LessonProps {
  apiData: OutputClass;
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

const getTeacher = (rawDescrciption: string) => {
  const stageA = rawDescrciption.split('\n')[0].split(' ');
  const stageB = stageA.splice(1, stageA.length - 1);

  if (stageB[0] === undefined) return '';

  return `${stageB[0]} ${stageB[1]?.substring(0, 1)}. ${stageB[2]?.substring(0, 1)}.`;
};

export const Lesson = ({ apiData }: LessonProps) => {
  const para = apiData.class;

  const paraBegin = convertDateToTime(para.startTime);
  const paraEnd = convertDateToTime(para.endTime);

  const navigate = useNavigate();

  const showDetails = () => {
    navigate(
      {
        pathname: 'lesson',
        search: `?time=${encodeURIComponent(apiData.class.startTime)}`
      },
      { state: apiData }
    );
  };

  return (
    <section className={styles['container']} onClick={showDetails}>
      <header className={styles['header']}>
        <h3 className={styles['subject']}>{convertSummary(para.summary)}</h3>
        <p className={clsx(styles['type'], styles[lessonColor[para.category as keyof typeof lessonColor]])}>
          {para.category}
        </p>
      </header>
      {apiData.homework.length > 0 && (
        <ol className={styles['homework-info']}>
          <h4>Задание</h4>
          {apiData.homework.map((homework, index) => (
            <li key={homework.homeworkID} className={styles['task']}>
              <div className={styles['task-text']}>
                <p>{`${index + 1}. `}</p>
                <p className={clsx(styles['homework'], homework.isCompleted && styles['complete'])}>
                  {homework.homeworkText}
                </p>
              </div>
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
  );
};
