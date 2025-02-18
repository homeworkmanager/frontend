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
import { formatText } from '@/utils/helpers/formatText';
import {
  useDeleteModeratorHomeworkMutation,
  usePostHomeworkStatusMutation
} from '@/utils/redux/apiSlices/scheduleApiSlice/scheduleApi';
import { getUserRole } from '@/utils/redux/storeSlices/userSlice/selectors';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import { SwiperRef } from 'swiper/react';

interface IndependentHomeworkProps {
  Homeworks: RestructIndependentHomeworkArray;
  dayCarouselRef: React.RefObject<SwiperRef>;
}

export const IndependentHomework = ({ Homeworks, dayCarouselRef }: IndependentHomeworkProps) => {
  const [deleteModeratorHomeworkMutation, deleteHomeworkState] = useDeleteModeratorHomeworkMutation();
  const [postHomeworkStatusMutation, postHomeworkStatusState] = usePostHomeworkStatusMutation();

  const [independentHomeworks, setIndependentHomeworks] = React.useState<RestructIndependentHomeworkArray>(Homeworks);

  const userRole = useSelector(getUserRole);

  const [currentHomework, setCurrentHomework] = React.useState<RestructHomeworkElement>({
    homeworkText: '',
    homeworkID: -1,
    isCompleted: false
  });

  const updateHeight = () => {
    if (dayCarouselRef.current) {
      dayCarouselRef.current.swiper.wrapperEl.style.height = 'auto';
    }
  };

  const removeCurrentHomework = () => {
    setCurrentHomework({ homeworkText: '', homeworkID: -1, isCompleted: false });
    updateHeight();
  };

  const addCurrentHomework = (elem: RestructHomeworkElement) => {
    if (currentHomework.homeworkID !== -1) {
      removeCurrentHomework();
      return;
    }
    setCurrentHomework(elem);
    updateHeight();
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
                <React.Fragment key={homework.homeworkID}>
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
                          {currentHomework.homeworkID === -1 || currentHomework.homeworkID === homework.homeworkID ? (
                            <Button
                              variant="slide"
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
                            variant="slide"
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
                </React.Fragment>
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
          </div>
        </article>
      )}
    </>
  );
};
