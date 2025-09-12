import React from 'react';

import styles from './ChangeHomework.module.css';
import { Button } from '@/shared/ui/Button';
import { Loader } from '@/shared/ui/Loader';
import { Textarea } from '@/shared/ui/Textarea';
import { Toast } from '@/shared/ui/Toast';
import { formatText } from '@/utils/helpers/formatText';
import { usePatchModeratorHomeworkMutation } from '@/utils/store/middleware/endpoints/schedule';
import { motion } from 'framer-motion';

interface ChangeHomeworkProps {
  currentHomework: RestructHomeworkElement;
  onClose: () => void;
  changeHomework: (homework: RestructHomeworkElement) => void;
}

export const ChangeHomework = ({ changeHomework, currentHomework, onClose }: ChangeHomeworkProps) => {
  const [patchModeratorHomework, patchHomeworkState] = usePatchModeratorHomeworkMutation();
  const [homeworkText, setHomeworkText] = React.useState(currentHomework.homeworkText);

  const changeLessonHomework = async () => {
    const response = await patchModeratorHomework({
      params: { homeworkID: currentHomework.homeworkID, homeworkText: homeworkText }
    });

    if (!response.error) {
      changeHomework({
        homeworkID: currentHomework.homeworkID,
        homeworkText: formatText(homeworkText),
        isCompleted: false,
        files: currentHomework.files
      });
      onClose();
    }
  };

  return (
    <motion.section
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
      <Button
        variant="accept"
        disabled={patchHomeworkState.isLoading || !homeworkText || homeworkText === currentHomework.homeworkText}
        onClick={changeLessonHomework}
      >
        {patchHomeworkState.isLoading ? <Loader /> : 'Изменить'}
      </Button>
      {patchHomeworkState.isError && <Toast type="mobile" text="Ошибка обновления задания" />}
    </motion.section>
  );
};
