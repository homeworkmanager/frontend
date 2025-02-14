import React from 'react';

import styles from './AddLessonHomework.module.css';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { Textarea } from '@/components/ui/Textarea';
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
        homeworkText: homeworkText.replace(/( {2})|(\n{2})/g, ''),
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
      <Textarea
        value={homeworkText}
        onChange={(e) => setHomeworkText(e.target.value)}
        label="Добавить задание"
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
