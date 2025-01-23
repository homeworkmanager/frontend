import React from 'react';
import { useSelector } from 'react-redux';

import { ChangeLessonHomework } from '../../ChangeLessonHomework/ChangeLessonHomework';
import { convertSummary } from '../helpers/convertSummary';

import { AddLessonHomework } from './AddLessonHomework/AddLessonHomework';
import styles from './LessonCard.module.css';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { HomeworkList } from '@/components/ui/HomeworkList/HomeworkList';
import { ChangeLogo } from '@/components/ui/Icons/Change';
import { DeleteLogo } from '@/components/ui/Icons/Delete';
import { Slide } from '@/components/ui/Icons/Slide';
import { Typhography } from '@/components/ui/Typhography';
import { ModeratorRole } from '@/utils/constants/userRoles';
import {
  useDeleteModeratorHomeworkMutation,
  usePostHomeworkStatusMutation
} from '@/utils/redux/apiSlices/scheduleApiSlice/scheduleApi';
import { getUserRole } from '@/utils/redux/storeSlices/userSlice/selectors';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Loader } from '@/components/ui/Loader';

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
  return description.split(' ').splice(1).join(' ').split('\n')[0];
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

  const [deleteModeratorHomeworkMutation] = useDeleteModeratorHomeworkMutation();
  const [postHomeworkStatusMutation, { isLoading: isStatusLoading }] = usePostHomeworkStatusMutation();

  const [homeworkId, setHomeworkId] = React.useState(-1);

  const removeHomeworkId = () => {
    setHomeworkId(-1);
  };

  const addHomeworkId = (id: number) => {
    if (homeworkId !== -1) {
      removeHomeworkId();
      return;
    }
    setHomeworkId(id);
  };

  const deleteLessonHomework = async (homework: RestructHomeworkElement) => {
    const response = await deleteModeratorHomeworkMutation({ params: { homeworkID: homework.homeworkID } });

    if (!response.error) {
      deleteHomework(homework);
      if (homeworkId === homework.homeworkID) removeHomeworkId();
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
        <Button variant="slide" rotate={true} className={styles['close']} onClick={showDetails}>
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
          <HomeworkList>
            {homeworks.map((homework, index) => (
              <HomeworkList.Row key={homework.homeworkID}>
                <HomeworkList.Column>
                  <Typhography
                    tag="p"
                    variant="thirdy"
                    className={clsx(styles['number'], homework.isCompleted && styles['number-complete'])}
                    children={`${index + 1}. `}
                  />
                  <Typhography
                    tag="p"
                    variant="thirdy"
                    className={clsx(styles['text'], homework.isCompleted && styles['complete'])}
                    children={homework.homeworkText}
                  />
                </HomeworkList.Column>
                {userRole > ModeratorRole && (
                  <>
                    <HomeworkList.Column>
                      {isStatusLoading ? <Loader className={styles['icon']} /> : <Checkbox checked={homework.isCompleted} onChange={() => changeLessonHomeworkStatus(homework)} />}
                      {homeworkId === -1 || homeworkId === homework.homeworkID ? (
                        <Button
                          variant="slide"
                          onClick={() => addHomeworkId(homework.homeworkID)}
                          children={
                            <ChangeLogo
                              className={clsx(styles['icon'], homeworkId === homework.homeworkID && styles['active'])}
                            />
                          }
                        />
                      ) : (
                        <div style={{ width: '24px', height: '24px' }} />
                      )}
                      <Button
                        variant="slide"
                        onClick={() => deleteLessonHomework(homework)}
                        children={<DeleteLogo className={styles['delete-icon']} />}
                      />
                    </HomeworkList.Column>
                  </>
                )}
              </HomeworkList.Row>
            ))}
          </HomeworkList>
          <ChangeLessonHomework
            HomeworkId={homeworkId}
            removeHomeworkId={removeHomeworkId}
            changeHomework={changeHomework}
          />
        </article>
        <article className={styles['section']}>
          <Typhography tag="h3" variant="additional" className={styles['info']} children={'Место'} />
          <Typhography tag="p" variant="thirdy" children={apiData.class.location} />
        </article>
        <article className={styles['section']}>
          <Typhography tag="h3" variant="additional" className={styles['info']} children={'Преподаватель'} />
          <Typhography tag="p" variant="thirdy" children={description} />
        </article>
        {userRole > ModeratorRole && <AddLessonHomework apiData={apiData} addHomework={addHomework} />}
      </section>
    </motion.aside>
  );
};
