import React from 'react';
import { useSelector } from 'react-redux';

import { ChangeLessonHomework } from '../ChangeLessonHomework/ChangeLessonHomework';

import styles from './IndependentHomework.module.css';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { ChangeLogo } from '@/components/ui/Icons/Change';
import { DeleteLogo } from '@/components/ui/Icons/Delete';
import { Loader } from '@/components/ui/Loader';
import { MultiList } from '@/components/ui/MultiList/MultiList';
import { Typhography } from '@/components/ui/Typhography';
import { ModeratorRole } from '@/utils/constants/userRoles';
import {
  useDeleteModeratorHomeworkMutation,
  usePostHomeworkStatusMutation
} from '@/utils/redux/apiSlices/scheduleApiSlice/scheduleApi';
import { getUserRole } from '@/utils/redux/storeSlices/userSlice/selectors';
import clsx from 'clsx';

interface IndependentHomeworkProps {
  Homeworks: RestructHomeworkElement[];
  updateHeight: () => void;
}

export const IndependentHomework = ({ Homeworks, updateHeight }: IndependentHomeworkProps) => {
  const [deleteModeratorHomeworkMutation, deleteHomeworkState] = useDeleteModeratorHomeworkMutation();
  const [postHomeworkStatusMutation, postHomeworkStatusState] = usePostHomeworkStatusMutation();

  const [independentHomeworks, setIndependentHomeworks] = React.useState<RestructHomeworkElement[]>(() => [
    ...Homeworks
  ]);

  const userRole = useSelector(getUserRole);

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

  const removeHomework = async (homework: RestructHomeworkElement) => {
    const response = await deleteModeratorHomeworkMutation({ params: { homeworkID: homework.homeworkID } });

    if (!response.error) {
      setIndependentHomeworks((prev) => prev.filter((item) => item.homeworkID !== homework.homeworkID));
      if (homeworkId === homework.homeworkID) removeHomeworkId();
    }
  };
  const changeHomework = (homework: RestructHomeworkElement) => {
    setIndependentHomeworks((prev) => [
      ...prev.map((item) => {
        if (item.homeworkID === homework.homeworkID) {
          return {
            ...item,
            homeworkText: homework.homeworkText,
            isCompleted: false
          };
        }
        return item;
      })
    ]);
    updateHeight();
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
      updateHeight();
    }
  };

  return (
    <>
      {independentHomeworks.length > 0 && (
        <article className={styles['container']}>
          <Typhography tag="p" variant="primary" children={`Задания на день`} className={styles['title']} />
          <div className={styles['content']}>
            <MultiList>
              {independentHomeworks.map((homework, index) => (
                <MultiList.Row key={homework.homeworkID}>
                  <MultiList.Column icons={userRole >= ModeratorRole ? 3 : 1}>
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
                  </MultiList.Column>
                  <MultiList.Column>
                    {postHomeworkStatusState.isLoading ? (
                      <Loader spinnerSize={24} className={styles['loader']} />
                    ) : (
                      <Checkbox checked={homework.isCompleted} onChange={() => changeHomeworkStatus(homework)} />
                    )}
                    {userRole >= ModeratorRole && (
                      <>
                        {(homeworkId === -1 || homeworkId === homework.homeworkID) && (
                          <Button
                            variant="slide"
                            onClick={() => addHomeworkId(homework.homeworkID)}
                            children={
                              <ChangeLogo
                                className={clsx(styles['icon'], homeworkId === homework.homeworkID && styles['active'])}
                              />
                            }
                          />
                        )}
                        <Button
                          variant="slide"
                          onClick={() => removeHomework(homework)}
                          children={
                            deleteHomeworkState.isLoading && homeworkId === homework.homeworkID ? (
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
            <ChangeLessonHomework
              HomeworkId={homeworkId}
              removeHomeworkId={removeHomeworkId}
              changeHomework={changeHomework}
            />
          </div>
        </article>
      )}
    </>
  );
};
