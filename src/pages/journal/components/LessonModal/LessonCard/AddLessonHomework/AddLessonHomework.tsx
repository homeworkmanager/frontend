import React from 'react';

import styles from './AddLessonHomework.module.css';
import { UploadFile } from '@/shared/Icons/UploadFile';
import { UploadFiles } from '@/shared/modules/molecules/UploadFiles/UploadFiles';
import { Button } from '@/shared/ui/Button';
import { Loader } from '@/shared/ui/Loader';
import { Modal } from '@/shared/ui/Modal';
import { Textarea } from '@/shared/ui/Textarea';
import { Toast } from '@/shared/ui/Toast';
import { formatText } from '@/utils/helpers/formatText';
import { usePostModeratorAddHomeworkClassMutation } from '@/utils/store/middleware/endpoints/schedule';

interface ModeratorBlockProps {
  apiData: OutputClass;
  addHomework: (homework: RestructHomeworkElement) => void;
}

export const AddLessonHomework = ({ apiData, addHomework }: ModeratorBlockProps) => {
  const [addFileModal, getAddFileModal] = React.useState(false);

  const [postModeratorAddHomeworkClassMutation, postAddHomeworkStatusState] =
    usePostModeratorAddHomeworkClassMutation();

  const [homeworkText, setHomeworkText] = React.useState('');
  const [files, setFiles] = React.useState<File[]>([]);

  const pushFiles = (newFiles: File[]) => {
    setFiles(newFiles);
    getAddFileModal(false);
  };

  const sendLessonHomework = async () => {
    const postModeratorAddHomeworkClassResponse = await postModeratorAddHomeworkClassMutation({
      params: {
        classSemNumber: apiData.class.semClassNumber,
        subjectId: apiData.class.subjectId,
        Category: apiData.class.category,
        homeworkText: formatText(homeworkText),
        dueDate: apiData.class.startTime,
        files: files
      }
    });

    const serverData = postModeratorAddHomeworkClassResponse.data;

    if (!postModeratorAddHomeworkClassResponse.error && serverData?.data) {
      addHomework({
        homeworkText: homeworkText,
        homeworkID: serverData.homework_id,
        isCompleted: false,
        files: Object.keys(serverData.filesIdMap).map((fileName) => {
          const fileId = serverData.filesIdMap[fileName];
          return {
            FileID: fileId,
            FileName: fileName,
            FileURL: serverData.filesURLMap[fileId],
            CreatedAt: new Date().toISOString()
          };
        })
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

        <Button variant="logo" onClick={() => getAddFileModal(true)}>
          <UploadFile />
        </Button>

        {(postAddHomeworkStatusState.isSuccess || postAddHomeworkStatusState.isError) && (
          <Toast
            type="mobile"
            text={postAddHomeworkStatusState.isSuccess ? 'Задание добавлено' : 'Ошибка добавления задания'}
          />
        )}

        <Modal showInfo={addFileModal} showDetails={() => getAddFileModal(false)}>
          <UploadFiles addHomeworkFile={pushFiles} onClose={() => getAddFileModal(false)} />
        </Modal>
      </div>
    </article>
  );
};
