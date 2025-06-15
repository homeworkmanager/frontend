import React from 'react';

import styles from './ScheduleHomework.module.css';
import { Homework } from '@/components/shared/modules/Homework/Homework';
import { MultiList } from '@/components/ui/MultiList/MultiList';
import { Typhography } from '@/components/ui/Typhography';
import { convertDateToTime } from '@/utils/helpers/convertDateToTime';
import { formatText } from '@/utils/helpers/formatText';
import clsx from 'clsx';

interface ScheduleHomeworkProps {
  Homeworks: RestructIndependentHomeworkArray;
  DayDate: string;
  CurrentDate: string;
}

const weekDay = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

export const ScheduleHomework = ({ Homeworks, DayDate, CurrentDate }: ScheduleHomeworkProps) => {
  const [homeworks, setHomeworks] = React.useState<RestructIndependentHomeworkArray>(Homeworks);

  const deleteHomework = async (homework: RestructHomeworkElement) => {
    setHomeworks((prev) => prev.filter((item) => item.homeworkID !== homework.homeworkID));
  };

  const changeHomework = (homework: RestructHomeworkElement) => {
    setHomeworks((prev) => [
      ...prev.map((item) => {
        if (item.homeworkID === homework.homeworkID) {
          return {
            ...item,
            homeworkText: formatText(homework.homeworkText),
            isCompleted: false
          };
        }
        return item;
      })
    ]);
  };

  const changeHomeworkStatus = async (homework: RestructHomeworkElement) => {
    setHomeworks((prev) => [
      ...prev.map((item) => {
        if (item.homeworkID === homework.homeworkID) {
          return {
            ...item,
            isCompleted: !homework.isCompleted
          };
        }
        return item;
      })
    ]);
  };

  const date = new Date(DayDate);

  return (
    <>
      {homeworks.length > 0 && (
        <article className={styles['container']}>
          <div className={styles['title']}>
            <Typhography
              tag="p"
              variant="secondary"
              children={`${weekDay[date.getDay()]} ${date.toLocaleDateString('ru', { day: '2-digit', month: '2-digit' })}`}
              className={clsx(DayDate === CurrentDate && styles['current'])}
            />
          </div>

          <MultiList>
            {homeworks.map((homework, index) => (
              <div key={index} className={styles['content']}>
                <MultiList.Row>
                  <MultiList.Column>
                    <Typhography
                      tag="p"
                      variant="small"
                      style={{ marginBottom: '.5rem', color: 'var(--time-color)' }}
                      children={`До ${convertDateToTime(homework.dueDate)}`}
                    />
                  </MultiList.Column>
                </MultiList.Row>
                <MultiList.Row>
                  <MultiList.Column>
                    <Typhography
                      tag="p"
                      variant="thirdy"
                      style={{ marginBottom: '.35rem' }}
                      children={`${homework.subjectName}`}
                    />
                  </MultiList.Column>
                </MultiList.Row>
                <Homework
                  homework={homework}
                  index={index}
                  deleteHomework={deleteHomework}
                  changeHomework={changeHomework}
                  changeHomeworkStatus={changeHomeworkStatus}
                />
              </div>
            ))}
          </MultiList>
        </article>
      )}
    </>
  );
};
