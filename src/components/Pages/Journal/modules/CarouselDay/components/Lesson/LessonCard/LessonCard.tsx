import { useSelector } from 'react-redux';

import { convertSummary } from '../helpers/convertSummary';

import { AddLessonHomework } from './AddLessonHomework/AddLessonHomework';
import styles from './LessonCard.module.css';
import { Button } from '@/components/ui/Button';
import { DeleteLogo } from '@/components/ui/Icons/Delete';
import { Slide } from '@/components/ui/Icons/Slide';
import { Typhography } from '@/components/ui/Typhography';
import { BaseRole } from '@/utils/constants/userRoles';
import { useDeleteModeratorHomeworkMutation } from '@/utils/redux/apiSlices/moderatorApiSlice/moderatorApi';
import { getUserRole } from '@/utils/redux/storeSlices/userSlice/selectors';
import { motion } from 'framer-motion';

interface LessonInfoProps {
  apiData: OutputClass;
  homeworks: RestructHomeworkArray;
  addHomework: (homework: RestructHomeworkElement) => void;
  deleteHomework: (id: number) => void;
  showDetails: () => void;
}

const RestructDescription = (description: string) => {
  return description.split(' ').splice(1).join(' ').split('\n')[0];
};

export const LessonCard = ({ apiData, homeworks, showDetails, addHomework, deleteHomework }: LessonInfoProps) => {
  const userRole = useSelector(getUserRole);

  const description = RestructDescription(apiData.class.description);

  const [deleteModeratorHomeworkMutation] = useDeleteModeratorHomeworkMutation(); //потом попробую изолировать как-то

  const deleteLessonHomework = async (id: number) => {
    const response = await deleteModeratorHomeworkMutation({ params: { homeworkID: id } });

    if (!response.error) {
      deleteHomework(id);
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
          <table className={styles['homework-list']}>
            <tbody>
              {homeworks.map((homework, index) => (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  key={homework.homeworkID}
                  className={styles['homework-list-item']}
                >
                  <td>
                    <p>{`${index + 1}. `}</p>
                  </td>
                  <td>
                    <p>{homework.homeworkText}</p>
                  </td>
                  {userRole > BaseRole && (
                    <td>
                      <Button
                        variant="slide"
                        onClick={() => deleteLessonHomework(homework.homeworkID)}
                        children={<DeleteLogo className={styles['delete-icon']} />}
                      />
                    </td>
                  )}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </article>
        <article className={styles['section']}>
          <Typhography tag="h3" variant="additional" className={styles['info']} children={'Место'} />
          <Typhography tag="p" variant="thirdy" children={apiData.class.location} />
        </article>
        <article className={styles['section']}>
          <Typhography tag="h3" variant="additional" className={styles['info']} children={'Преподаватель'} />
          <Typhography tag="p" variant="thirdy" children={description} />
        </article>
        {userRole > BaseRole && <AddLessonHomework apiData={apiData} addHomework={addHomework} />}
      </section>
    </motion.aside>
  );
};
