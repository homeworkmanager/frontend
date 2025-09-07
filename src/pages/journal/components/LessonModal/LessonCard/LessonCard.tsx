import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { AddLessonHomework } from './AddLessonHomework';
import styles from './LessonCard.module.css';
import { Slide } from '@/shared/Icons/Slide';
import { Homework } from '@/shared/modules/Homework/Homework';
import { Button } from '@/shared/ui/Button';
import { MultiList } from '@/shared/ui/MultiList';
import { Typhography } from '@/shared/ui/Typhography';
import { USER_ROLES } from '@/utils/constants/userRoles';
import { convertSummary } from '@/utils/helpers/convertSummary';
import { formatText } from '@/utils/helpers/formatText';
import { getUserRole } from '@/utils/redux/storeSlices/user/selectors';
import { motion } from 'framer-motion';

interface LessonInfoProps {
  showDetails: () => void;
}

const RestructDescription = (description: string) => {
  const stageA = description.split('\n');
  if (stageA[0].split(' ').length === 1) return stageA.splice(1, stageA.findIndex((el) => el === 'Группы:') - 1);

  return [stageA[0].split(' ').splice(1).join(' ')];
};

export const LessonCard = ({ showDetails }: LessonInfoProps) => {
  const location = useLocation();
  const apiData: OutputClass = location.state;

  const userRole = useSelector(getUserRole);

  const [homeworks, setHomeworks] = React.useState<RestructHomeworkArray>(apiData.homework);

  const description = RestructDescription(apiData.class.description);

  const addHomework = (homework: RestructHomeworkElement) => {
    setHomeworks((prev) => [...prev, { ...homework, homeworkText: formatText(homework.homeworkText) }]);
  };

  const deleteHomework = (homework: RestructHomeworkElement) => {
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

  const changeHomeworkStatus = (homework: RestructHomeworkElement) => {
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
      <header className={styles['header']}>
        <Button variant="logo" rotate={true} className={styles['close']} onClick={showDetails}>
          <Slide />
        </Button>
        <Typhography tag="h3" variant="secondary" children={'Предмет'} />
      </header>
      <section className={styles['container']}>
        <article className={styles['section']}>
          <Typhography tag="h3" variant="additional" className={styles['info']} children={'Название предмета'} />
          <Typhography tag="p" variant="thirdy" children={convertSummary(apiData.class.summary)} />
        </article>
        <article className={styles['section']}>
          <Typhography tag="h3" variant="additional" className={styles['info']} children={'Тип занятия'} />
          <Typhography tag="p" variant="thirdy" children={apiData.class.category} />
        </article>
        <article className={styles['section']}>
          <Typhography tag="h3" variant="additional" className={styles['info']} children={'Задание'} />
          {homeworks.length === 0 && <Typhography tag="h3" variant="thirdy" children={'Отсутствует'} />}
          <MultiList>
            {homeworks.map((homework, index) => (
              <React.Fragment key={homework.homeworkID}>
                <Homework
                  homework={homework}
                  index={index}
                  deleteHomework={deleteHomework}
                  changeHomework={changeHomework}
                  changeHomeworkStatus={changeHomeworkStatus}
                />
              </React.Fragment>
            ))}
          </MultiList>
        </article>
        <article className={styles['section']}>
          <Typhography tag="h3" variant="additional" className={styles['info']} children={'Место'} />
          <Typhography tag="p" variant="thirdy" children={apiData.class.location} />
        </article>
        <article className={styles['section']}>
          <Typhography
            tag="h3"
            variant="additional"
            className={styles['info']}
            children={`Преподавател${description.length <= 1 ? 'ь' : 'и'}`}
          />
          {description.map((teacher, index) => (
            <Typhography key={index} tag="p" variant="thirdy" children={teacher} />
          ))}
          {description.length === 0 && <Typhography tag="p" variant="thirdy" children={'Не указан'} />}
        </article>
        {userRole >= USER_ROLES.MODERATOR && <AddLessonHomework apiData={apiData} addHomework={addHomework} />}
      </section>
    </motion.aside>
  );
};
