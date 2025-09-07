import styles from './LessonsList.module.css';
import clsx from 'clsx';

interface LessonsListProps {
  lessons: Lessons;
}

const lessonColor = {
  '': 'unknown',
  ЛК: 'lect',
  ПР: 'pract',
  Лаб: 'lab',
  Зачет: 'zach',
  Консультация: 'cons',
  Экзамен: 'exam'
};

export const LessonsList = ({ lessons }: LessonsListProps) => {
  return (
    <ul className={styles['list']}>
      {lessons.map((lesson) => (
        <li
          key={lesson.class.startTime}
          className={clsx(styles['item'], styles[lessonColor[lesson.class.category as keyof typeof lessonColor]])}
        />
      ))}
      {lessons.length === 0 && <li className={clsx(styles['item'], styles['none-lessons'])} />}
    </ul>
  );
};
