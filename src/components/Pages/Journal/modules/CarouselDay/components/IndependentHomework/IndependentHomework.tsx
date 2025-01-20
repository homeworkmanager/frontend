import styles from './IndependentHomework.module.css';
import { Typhography } from '@/components/ui/Typhography';

interface IndependentHomeworkProps {
  Homeworks: RestructHomeworkElement[];
  currentValue: ValuesDate;
}

export const IndependentHomework = ({ Homeworks }: IndependentHomeworkProps) => {
  return (
    <>
      {Boolean(Homeworks && !!Homeworks.length) && (
        <article className={styles['container']}>
          <Typhography tag="p" variant="primary" children={`Задания на день`} className={styles['title']} />
          <ul className={styles['content']}>
            {Homeworks.map((homework) => (
              <li key={homework.homeworkID}>{homework.homeworkText}</li>
            ))}
          </ul>
        </article>
      )}
    </>
  );
};
