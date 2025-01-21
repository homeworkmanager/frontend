import React from 'react';
import { useSelector } from 'react-redux';

import styles from './IndependentHomework.module.css';
import { IHContext } from '@/App/modules/IHContext';
import { Button } from '@/components/ui/Button';
import { ChangeLogo } from '@/components/ui/Icons/Change';
import { DeleteLogo } from '@/components/ui/Icons/Delete';
import { Typhography } from '@/components/ui/Typhography';
import { ModeratorRole } from '@/utils/constants/userRoles';
import { useDeleteModeratorHomeworkMutation } from '@/utils/redux/apiSlices/moderatorApiSlice/moderatorApi';
import { getUserRole } from '@/utils/redux/storeSlices/userSlice/selectors';
import { AnimatePresence, motion } from 'framer-motion';
import { ChangeLessonHomework } from '../ChangeLessonHomework/ChangeLessonHomework';

interface IndependentHomeworkProps {
  Index: number;
  Homeworks: RestructHomeworkElement[];
  updateHeight: () => void;
}

export const IndependentHomework = ({ Index, Homeworks, updateHeight }: IndependentHomeworkProps) => {
  const [deleteModeratorHomeworkMutation] = useDeleteModeratorHomeworkMutation();
  const { removeIndependentHomework, changeIndependentHomework } = React.useContext(IHContext);

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

  const deleteHomework = async (value: RestructHomeworkElement) => {
    const response = await deleteModeratorHomeworkMutation({ params: { homeworkID: value.homeworkID } });

    if (!response.error) {
      removeIndependentHomework(value, Index);
    }
  };
  const changeHomework = (value: RestructHomeworkElement) => {
    changeIndependentHomework(value, Index)
    updateHeight();
  };

  return (
    <>
      {Boolean(Homeworks && !!Homeworks.length) && (
        <article className={styles['container']}>
          <Typhography tag="p" variant="primary" children={`Задания на день`} className={styles['title']} />
          <div className={styles['content']}>
            <table className={styles['table']}>
              <AnimatePresence>
                <tbody>
                  {Homeworks.map((homework) => (
                    <motion.tr
                      key={homework.homeworkID}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <td>
                        <Typhography tag="p" variant="thirdy" children={homework.homeworkText} />
                      </td>
                      {userRole >= ModeratorRole && (
                        <>
                          {homeworkId === -1 || homeworkId === homework.homeworkID ? (
                            <motion.td initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles['mobile']}>
                              <Button
                                variant="slide"
                                onClick={() => addHomeworkId(homework.homeworkID)}
                                className={styles['icon']}
                                children={<ChangeLogo />}
                              />
                            </motion.td>
                          ) : (
                            <td />
                          )}
                          <td className={styles['mobile']}>
                            <Button
                              variant="slide"
                              className={styles['icon']}
                              onClick={() => deleteHomework(homework)}
                              children={<DeleteLogo />}
                            />
                          </td>
                        </>
                      )}
                    </motion.tr>
                  ))}
                </tbody>
              </AnimatePresence>
            </table>
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
