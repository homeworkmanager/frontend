import React from 'react';

import styles from './IndependentHomework.module.css';
import { IHContext } from '@/App/modules/IHContext';
import { Typhography } from '@/components/ui/Typhography';

interface IndependentHomeworkProps {
  Index: number;
  Homeworks: RestructHomeworkElement[];
}

export const IndependentHomework = ({ Index, Homeworks }: IndependentHomeworkProps) => {
  const { removeIndependentHomework, changeIndependentHomework } = React.useContext(IHContext);

  const deleteHomework = (value: RestructHomeworkElement) => removeIndependentHomework(value, Index);

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
