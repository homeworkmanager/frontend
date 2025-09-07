import React from 'react';

import styles from './IndependentHomework.module.css';
import { Homework } from '@/shared/modules/Homework/Homework';
import { MultiList } from '@/shared/ui/MultiList';
import { Typhography } from '@/shared/ui/Typhography';
import { convertDateToTime } from '@/utils/helpers/convertDateToTime';
import { formatText } from '@/utils/helpers/formatText';
import { SwiperRef } from 'swiper/react';

interface IndependentHomeworkProps {
  Homeworks: RestructIndependentHomeworkArray;
  dayCarouselRef: React.RefObject<SwiperRef>;
}

export const IndependentHomework = ({ Homeworks, dayCarouselRef }: IndependentHomeworkProps) => {
  const [independentHomeworks, setIndependentHomeworks] = React.useState<RestructIndependentHomeworkArray>(Homeworks);

  const updateHeight = () => {
    if (dayCarouselRef && dayCarouselRef.current) {
      dayCarouselRef.current.swiper.wrapperEl.style.height = 'auto';
    }
  };

  const deleteHomework = async (homework: RestructHomeworkElement) => {
    setIndependentHomeworks((prev) => prev.filter((item) => item.homeworkID !== homework.homeworkID));
    updateHeight();
  };

  const changeHomework = (homework: RestructHomeworkElement) => {
    setIndependentHomeworks((prev) => [
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
    updateHeight();
  };

  const changeHomeworkStatus = async (homework: RestructHomeworkElement) => {
    setIndependentHomeworks((prev) => [
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
    updateHeight();
  };

  return (
    <>
      {independentHomeworks.length > 0 && (
        <article className={styles['container']}>
          <Typhography tag="p" variant="primary" children={`Задания на день`} className={styles['title']} />
          <MultiList>
            {independentHomeworks.map((homework, index) => (
              <div className={styles['content']} key={homework.homeworkID}>
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
                  updateHeight={updateHeight}
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
