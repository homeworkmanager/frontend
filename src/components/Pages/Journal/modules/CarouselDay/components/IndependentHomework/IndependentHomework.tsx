import React from 'react';
import { useSelector } from 'react-redux';

import { ChangeLessonHomework } from '../ChangeLessonHomework/ChangeLessonHomework';

import styles from './IndependentHomework.module.css';
import { IHContext } from '@/App/modules/IHContext';
import { Button } from '@/components/ui/Button';
import { HomeworkList } from '@/components/ui/HomeworkList/HomeworkList';
import { ChangeLogo } from '@/components/ui/Icons/Change';
import { DeleteLogo } from '@/components/ui/Icons/Delete';
import { Typhography } from '@/components/ui/Typhography';
import { ModeratorRole } from '@/utils/constants/userRoles';
import { useDeleteModeratorHomeworkMutation } from '@/utils/redux/apiSlices/moderatorApiSlice/moderatorApi';
import { getUserRole } from '@/utils/redux/storeSlices/userSlice/selectors';
import clsx from 'clsx';
import { usePostHomeworkStatusMutation } from '@/utils/redux/apiSlices/userApiSlice/userApi';

interface IndependentHomeworkProps {
  Index: number;
  Homeworks: RestructHomeworkElement[];
  updateHeight: () => void;
}

export const IndependentHomework = ({ Index, Homeworks, updateHeight }: IndependentHomeworkProps) => {
  const [deleteModeratorHomeworkMutation] = useDeleteModeratorHomeworkMutation();
  const [postHomeworkStatusMutation] = usePostHomeworkStatusMutation();
  const { removeIndependentHomework, changeIndependentHomework, changeIndependentHomeworkStatus } = React.useContext(IHContext);

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
      removeIndependentHomework(homework, Index);
      if (homeworkId === homework.homeworkID) removeHomeworkId();
    }
  };
  const changeHomework = (value: RestructHomeworkElement) => {
    changeIndependentHomework(value, Index);
    updateHeight();
  };

  const changeHomeworkStatus = async (homework: RestructHomeworkElement) => {
    const response = await postHomeworkStatusMutation({ params: { homeworkID: homework.homeworkID, status: homework.isCompleted } });

    if (!response.error) {
      changeIndependentHomeworkStatus(homework, Index);
      updateHeight();
    }
  }

  return (
    <>
      {Boolean(Homeworks && !!Homeworks.length) && (
        <article className={styles['container']}>
          <Typhography tag="p" variant="primary" children={`Задания на день`} className={styles['title']} />
          <div className={styles['content']}>
            <HomeworkList>
              {Homeworks.map((homework, index) => (
                <HomeworkList.Row key={homework.homeworkID}>
                  <HomeworkList.Column isMobile={true}>
                    <Typhography tag="p" variant="thirdy" children={`${index + 1}. `} />
                  </HomeworkList.Column>
                  <HomeworkList.Column>
                    <Typhography tag="p" variant="thirdy" children={homework.homeworkText} />
                  </HomeworkList.Column>
                  {userRole >= ModeratorRole && (
                    <>
                      {homeworkId === -1 || homeworkId === homework.homeworkID ? (
                        <HomeworkList.Column isMobile={true}>
                          <Button
                            variant="slide"
                            onClick={() => addHomeworkId(homework.homeworkID)}
                            children={
                              <ChangeLogo
                                className={clsx(styles['icon'], homeworkId === homework.homeworkID && styles['active'])}
                              />
                            }
                          />
                        </HomeworkList.Column>
                      ) : (
                        <HomeworkList.Column children={''} />
                      )}
                      <HomeworkList.Column isMobile={true}>
                        <Button
                          variant="slide"
                          onClick={() => removeHomework(homework)}
                          children={<DeleteLogo className={styles['icon']} />}
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
          </div>
        </article>
      )}
    </>
  );
};
