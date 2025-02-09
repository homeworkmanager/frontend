import React from 'react';

import styles from './AddLessonHomework.module.css';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loader } from '@/components/ui/Loader';
import { Typhography } from '@/components/ui/Typhography';
import { usePostModeratorAddHomeworkClassMutation } from '@/utils/redux/apiSlices/scheduleApiSlice/scheduleApi';

interface ModeratorBlockProps {
  apiData: OutputClass;
  addHomework: (homework: RestructHomeworkElement) => void;
}

export const AddLessonHomework = ({ apiData, addHomework }: ModeratorBlockProps) => {
  const [postModeratorAddHomeworkClassMutation, postAddHomeworkStatusState] =
    usePostModeratorAddHomeworkClassMutation();
  const [homeworkText, setHomeworkText] = React.useState('');

  const sendLessonHomework = async () => {
    const postModeratorAddHomeworkClassResponse = await postModeratorAddHomeworkClassMutation({
      params: {
        classSemNumber: apiData.class.semClassNumber,
        subjectId: apiData.class.subjectId,
        Category: apiData.class.category,
        homeworkText: homeworkText,
        dueDate: apiData.class.startTime
      }
    });

    if (!postModeratorAddHomeworkClassResponse.error) {
      addHomework({
        homeworkText: homeworkText,
        homeworkID: postModeratorAddHomeworkClassResponse.data.homework_id,
        isCompleted: false
      });
      setHomeworkText('');
    }
  };

  return (
    <article className={styles['section']}>
      <Input
        value={homeworkText}
        onChange={(e) => setHomeworkText(e.target.value)}
        label="Добавить задание"
        variant="homework"
        name={`${apiData.class.startTime}`}
      />
      <Button
        variant="accept"
        disabled={postAddHomeworkStatusState.isLoading || !homeworkText}
        onClick={sendLessonHomework}
      >
        {postAddHomeworkStatusState.isLoading ? <Loader /> : 'Добавить'}
      </Button>
      {postAddHomeworkStatusState.isError && (
        <Typhography tag="p" variant="thirdy" className={styles['error']}>
          Ошибка
        </Typhography>
      )}
    </article>
  );
};
