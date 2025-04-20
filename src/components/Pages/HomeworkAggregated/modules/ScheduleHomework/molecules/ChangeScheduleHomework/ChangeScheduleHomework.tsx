import React from 'react';

import styles from './ChangeScheduleHomework.module.css';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { Textarea } from '@/components/ui/Textarea';
import { Typhography } from '@/components/ui/Typhography';
import { formatText } from '@/utils/helpers/formatText';
import { usePatchModeratorHomeworkMutation } from '@/utils/redux/apiSlices/schedule/scheduleApi';
import { motion } from 'framer-motion';

interface ChangeLessonHomeworkProps {
  currentHomework: RestructHomeworkElement;
  removeCurrentHomework: () => void;
  changeHomework: (homework: RestructHomeworkElement) => void;
}

export const ChangeScheduleHomework = ({
  changeHomework,
  currentHomework,
  removeCurrentHomework
}: ChangeLessonHomeworkProps) => {
  const [patchModeratorHomeworkMutation, patchHomeworkState] = usePatchModeratorHomeworkMutation();
  const [homeworkText, setHomeworkText] = React.useState(currentHomework.homeworkText);

  const changeLessonHomework = async () => {
    const response = await patchModeratorHomeworkMutation({
      params: { homeworkID: currentHomework.homeworkID, homeworkText: homeworkText }
    });

    if (!response.error) {
      changeHomework({
        homeworkID: currentHomework.homeworkID,
        homeworkText: formatText(homeworkText),
        isCompleted: false
      });
      removeCurrentHomework();
    }
  };

  return (
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={styles['section']}
    >
      <Textarea
        value={homeworkText}
        onChange={(e) => setHomeworkText(e.target.value)}
        label="Изменить задание"
        name={`${6}`}
      />
      <Button variant="accept" disabled={patchHomeworkState.isLoading || !homeworkText} onClick={changeLessonHomework}>
        {patchHomeworkState.isLoading ? <Loader /> : 'Изменить'}
      </Button>
      {patchHomeworkState.isError && (
        <Typhography tag="p" variant="thirdy" className={styles['error']}>
          Ошибка
        </Typhography>
      )}
    </motion.aside>
  );
};
