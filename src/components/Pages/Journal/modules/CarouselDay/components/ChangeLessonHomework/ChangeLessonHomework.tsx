import React from 'react';

import styles from './ChangeLessonHomework.module.css';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loader } from '@/components/ui/Loader';
import { Typhography } from '@/components/ui/Typhography';
import { usePatchModeratorHomeworkMutation } from '@/utils/redux/apiSlices/scheduleApiSlice/scheduleApi';
import { AnimatePresence, motion } from 'framer-motion';

interface ChangeLessonHomeworkProps {
  HomeworkId: number;
  removeHomeworkId: () => void;
  changeHomework: (homework: RestructHomeworkElement) => void;
}

export const ChangeLessonHomework = ({ changeHomework, HomeworkId, removeHomeworkId }: ChangeLessonHomeworkProps) => {
  const [patchModeratorHomeworkMutation, patchHomeworkState] = usePatchModeratorHomeworkMutation();
  const [homeworkText, setHomeworkText] = React.useState('');
  const changeLessonHomework = async () => {
    const response = await patchModeratorHomeworkMutation({
      params: { homeworkID: HomeworkId, homeworkText: homeworkText }
    });

    if (!response.error) {
      changeHomework({
        homeworkID: HomeworkId,
        homeworkText: homeworkText,
        isCompleted: false
      });
      removeHomeworkId();
    }
  };

  return (
    <AnimatePresence>
      {HomeworkId !== -1 && (
        <motion.aside
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={styles['section']}
        >
          <Input
            onChange={(e) => setHomeworkText(e.target.value)}
            label="Изменить задание"
            variant="homework"
            name={`${6}`}
          />
          <Button
            variant="accept"
            disabled={patchHomeworkState.isLoading || !homeworkText}
            onClick={changeLessonHomework}
          >
            {patchHomeworkState.isLoading ? <Loader /> : 'Изменить'}
          </Button>
          {patchHomeworkState.isError && (
            <Typhography tag="p" variant="thirdy" className={styles['error']}>
              Ошибка
            </Typhography>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
