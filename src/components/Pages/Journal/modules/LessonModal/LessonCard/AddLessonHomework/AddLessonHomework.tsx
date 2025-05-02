import React from 'react';
import { useSelector } from 'react-redux';

import { AddHomeworkFile } from '../../../../../../shared/modules/molecules/AddHomeworkFile/AddHomeworkFile';

import styles from './AddLessonHomework.module.css';
import { Button } from '@/components/ui/Button';
import { UploadFile } from '@/components/ui/Icons/UploadFile';
import { Loader } from '@/components/ui/Loader';
import { Modal } from '@/components/ui/Modal';
import { Textarea } from '@/components/ui/Textarea';
import { Typhography } from '@/components/ui/Typhography';
import { MODERATOR_ROLE } from '@/utils/configs/userRoles.config';
import { formatText } from '@/utils/helpers/formatText';
import { usePostModeratorAddHomeworkClassMutation } from '@/utils/redux/apiSlices/schedule/scheduleApi';
import { getUserRole } from '@/utils/redux/storeSlices/user/selectors';

interface ModeratorBlockProps {
  apiData: OutputClass;
  addHomework: (homework: RestructHomeworkElement) => void;
}

export const AddLessonHomework = ({ apiData, addHomework }: ModeratorBlockProps) => {
  const userRole = useSelector(getUserRole);
  const [showFileModal, getShowFileModal] = React.useState(false);

  const [postModeratorAddHomeworkClassMutation, postAddHomeworkStatusState] =
    usePostModeratorAddHomeworkClassMutation();
  const [homeworkText, setHomeworkText] = React.useState('');

  const sendLessonHomework = async () => {
    const postModeratorAddHomeworkClassResponse = await postModeratorAddHomeworkClassMutation({
      params: {
        classSemNumber: apiData.class.semClassNumber,
        subjectId: apiData.class.subjectId,
        Category: apiData.class.category,
        homeworkText: formatText(homeworkText),
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
      <div className={styles['footer']}>
        <Button
          variant="accept"
          disabled={postAddHomeworkStatusState.isLoading || !homeworkText}
          onClick={sendLessonHomework}
        >
          {postAddHomeworkStatusState.isLoading ? <Loader /> : 'Добавить'}
        </Button>
        {userRole >= MODERATOR_ROLE && (
          <Button variant="logo" onClick={() => getShowFileModal(true)}>
            <UploadFile />
          </Button>
        )}
        <Modal showInfo={showFileModal} showDetails={() => getShowFileModal(false)}>
          <AddHomeworkFile onClose={() => getShowFileModal(false)} />
        </Modal>
      </div>
      {postAddHomeworkStatusState.isError && (
        <Typhography tag="p" variant="thirdy" className={styles['error']}>
          Ошибка
        </Typhography>
      )}
    </article>
  );
};
