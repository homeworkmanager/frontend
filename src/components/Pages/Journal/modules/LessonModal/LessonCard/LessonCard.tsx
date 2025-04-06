import React from 'react';
import { useSelector } from 'react-redux';

import { ChangeLessonHomework } from '../../CarouselDay/components/ChangeLessonHomework/ChangeLessonHomework';

import { AddLessonHomework } from './AddLessonHomework/AddLessonHomework';
import styles from './LessonCard.module.css';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { ChangeLogo } from '@/components/ui/Icons/Change';
import { DeleteLogo } from '@/components/ui/Icons/Delete';
import { Slide } from '@/components/ui/Icons/Slide';
import { Loader } from '@/components/ui/Loader';
import { MultiList } from '@/components/ui/MultiList/MultiList';
import { Typhography } from '@/components/ui/Typhography';
import { MODERATOR_ROLE, OFFLINE_ROLE } from '@/utils/configs/userRoles.config';
import { convertSummary } from '@/utils/helpers/convertSummary';
import {
  useDeleteModeratorHomeworkMutation,
  usePostHomeworkStatusMutation
} from '@/utils/redux/apiSlices/scheduleApiSlice/scheduleApi';
import { getUserRole } from '@/utils/redux/storeSlices/userSlice/selectors';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

interface LessonInfoProps {
  apiData: OutputClass;
  homeworks: RestructHomeworkArray;
  showDetails: () => void;
  addHomework: (homework: RestructHomeworkElement) => void;
  deleteHomework: (homework: RestructHomeworkElement) => void;
  changeHomework: (homework: RestructHomeworkElement) => void;
  changeHomeworkStatus: (homework: RestructHomeworkElement) => void;
}

const RestructDescription = (description: string) => {
  const stageA = description.split('\n');
  if (stageA[0].split(' ').length === 1) return stageA.splice(1, stageA.findIndex((el) => el === 'Группы:') - 1);

  return [stageA[0].split(' ').splice(1).join(' ')];
};

export const LessonCard = ({
  apiData,
  homeworks,
  showDetails,
  addHomework,
  deleteHomework,
  changeHomework,
  changeHomeworkStatus
}: LessonInfoProps) => {
  const userRole = useSelector(getUserRole);

  const description = RestructDescription(apiData.class.description);

  const [deleteModeratorHomeworkMutation, deleteHomeworkState] = useDeleteModeratorHomeworkMutation();
  const [postHomeworkStatusMutation, postHomeworkStatusState] = usePostHomeworkStatusMutation();

  const [currentHomework, setCurrentHomework] = React.useState<RestructHomeworkElement>({
    homeworkText: '',
    homeworkID: -1,
    isCompleted: false
  });

  const removeCurrentHomework = () => {
    setCurrentHomework({ homeworkText: '', homeworkID: -1, isCompleted: false });
  };

  const addCurrentHomework = (elem: RestructHomeworkElement) => {
    if (currentHomework.homeworkID !== -1) {
      removeCurrentHomework();
      return;
    }
    setCurrentHomework(elem);
  };

  const deleteLessonHomework = async (homework: RestructHomeworkElement) => {
    const response = await deleteModeratorHomeworkMutation({ params: { homeworkID: homework.homeworkID } });

    if (!response.error) {
      deleteHomework(homework);
      if (currentHomework?.homeworkID === homework.homeworkID) removeCurrentHomework();
    }
  };

  const changeLessonHomeworkStatus = async (homework: RestructHomeworkElement) => {
    const response = await postHomeworkStatusMutation({
      params: { homeworkID: homework.homeworkID, status: !homework.isCompleted }
    });

    if (!response.error) {
      changeHomeworkStatus(homework);
    }
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
              <MultiList.Row key={homework.homeworkID}>
                <MultiList.Column icons={userRole >= MODERATOR_ROLE ? 3 : 1}>
                  <Typhography
                    tag="p"
                    variant="thirdy"
                    className={clsx(styles['number'], homework.isCompleted && styles['number-complete'])}
                    children={`${index + 1}.`}
                  />
                  <Typhography
                    tag="p"
                    variant="thirdy"
                    className={clsx(styles['text'], homework.isCompleted && styles['complete'])}
                    children={homework.homeworkText}
                  />
                </MultiList.Column>
                <MultiList.Column>
                  {postHomeworkStatusState.isLoading ? (
                    <Loader spinnerSize={24} className={styles['loader']} />
                  ) : (
                    <Checkbox
                      disabled={userRole === OFFLINE_ROLE}
                      checked={homework.isCompleted}
                      onChange={() => changeLessonHomeworkStatus(homework)}
                    />
                  )}
                  {userRole >= MODERATOR_ROLE && (
                    <>
                      {currentHomework?.homeworkID === -1 || currentHomework?.homeworkID === homework.homeworkID ? (
                        <Button
                          variant="logo"
                          onClick={() => addCurrentHomework(homework)}
                          children={
                            <ChangeLogo
                              className={clsx(
                                styles['icon'],
                                currentHomework.homeworkID === homework.homeworkID && styles['active']
                              )}
                            />
                          }
                        />
                      ) : (
                        <div style={{ width: '24px', height: '24px', marginLeft: '6px' }} />
                      )}
                      <Button
                        variant="logo"
                        onClick={() => deleteLessonHomework(homework)}
                        children={
                          deleteHomeworkState.isLoading ? (
                            <Loader spinnerSize={28} className={styles['loader']} />
                          ) : (
                            <DeleteLogo className={styles['delete-icon']} />
                          )
                        }
                      />
                    </>
                  )}
                </MultiList.Column>
              </MultiList.Row>
            ))}
          </MultiList>
          <AnimatePresence>
            {currentHomework.homeworkID !== -1 && (
              <ChangeLessonHomework
                currentHomework={currentHomework}
                removeCurrentHomework={removeCurrentHomework}
                changeHomework={changeHomework}
              />
            )}
          </AnimatePresence>
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
        {userRole >= MODERATOR_ROLE && <AddLessonHomework apiData={apiData} addHomework={addHomework} />}
      </section>
    </motion.aside>
  );
};
