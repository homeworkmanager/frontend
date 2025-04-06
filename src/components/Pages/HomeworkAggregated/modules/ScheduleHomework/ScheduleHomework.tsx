import React from 'react';
import { useSelector } from 'react-redux';

import { ChangeScheduleHomework } from '../ChangeScheduleHomework/ChangeScheduleHomework';

import styles from './ScheduleHomework.module.css';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { ChangeLogo } from '@/components/ui/Icons/Change';
import { DeleteLogo } from '@/components/ui/Icons/Delete';
import { Loader } from '@/components/ui/Loader';
import { MultiList } from '@/components/ui/MultiList/MultiList';
import { Typhography } from '@/components/ui/Typhography';
import { MODERATOR_ROLE, OFFLINE_ROLE } from '@/utils/configs/userRoles.config';
import { convertDateToTime } from '@/utils/helpers/convertDateToTime';
import { formatText } from '@/utils/helpers/formatText';
import {
  useDeleteModeratorHomeworkMutation,
  usePostHomeworkStatusMutation
} from '@/utils/redux/apiSlices/scheduleApiSlice/scheduleApi';
import { getUserRole } from '@/utils/redux/storeSlices/userSlice/selectors';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';

interface ScheduleHomeworkProps {
  Homeworks: RestructIndependentHomeworkArray;
  DayDate: string;
}

const weekDay = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

export const ScheduleHomework = ({ Homeworks, DayDate }: ScheduleHomeworkProps) => {
  const [deleteModeratorHomeworkMutation, deleteHomeworkState] = useDeleteModeratorHomeworkMutation();
  const [postHomeworkStatusMutation, postHomeworkStatusState] = usePostHomeworkStatusMutation();

  const [independentHomeworks, setIndependentHomeworks] = React.useState<RestructIndependentHomeworkArray>(Homeworks);

  const userRole = useSelector(getUserRole);

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

  const removeHomework = async (homework: RestructHomeworkElement) => {
    const response = await deleteModeratorHomeworkMutation({ params: { homeworkID: homework.homeworkID } });

    if (!response.error) {
      setIndependentHomeworks((prev) => prev.filter((item) => item.homeworkID !== homework.homeworkID));
      if (currentHomework.homeworkID === homework.homeworkID) removeCurrentHomework();
    }
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
  };

  const changeHomeworkStatus = async (homework: RestructHomeworkElement) => {
    const response = await postHomeworkStatusMutation({
      params: { homeworkID: homework.homeworkID, status: !homework.isCompleted }
    });

    if (!response.error) {
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
    }
  };

  const date = new Date(DayDate);

  return (
    <>
      {independentHomeworks.length > 0 && (
        <article className={styles['container']}>
          <div className={styles['title']}>
            <Typhography
              tag="p"
              variant="secondary"
              children={`${weekDay[date.getDay()]} ${date.toLocaleDateString('ru', { day: '2-digit', month: '2-digit' })}`}
              className={clsx(new Date().toDateString() === date.toDateString() && styles['current'])}
            />
          </div>

          <MultiList>
            {independentHomeworks.map((homework) => (
              <React.Fragment key={homework.homeworkID}>
                <div className={styles['content']}>
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
                  <MultiList.Row>
                    <MultiList.Column icons={userRole >= MODERATOR_ROLE ? 3 : 1}>
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
                          onChange={() => changeHomeworkStatus(homework)}
                        />
                      )}
                      {userRole >= MODERATOR_ROLE && (
                        <>
                          {currentHomework.homeworkID === -1 || currentHomework.homeworkID === homework.homeworkID ? (
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
                            onClick={() => removeHomework(homework)}
                            children={
                              deleteHomeworkState.isLoading && currentHomework.homeworkID === homework.homeworkID ? (
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
                </div>
                <AnimatePresence>
                  {currentHomework.homeworkID === homework.homeworkID && (
                    <ChangeScheduleHomework
                      currentHomework={currentHomework}
                      removeCurrentHomework={removeCurrentHomework}
                      changeHomework={changeHomework}
                    />
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </MultiList>
        </article>
      )}
    </>
  );
};
