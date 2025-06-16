import React from 'react';
import { useSelector } from 'react-redux';

import styles from './AddLessonHomework.module.css';
import { UploadFiles } from '@/components/shared/modules/molecules/UploadFiles/UploadFiles';
import { Button } from '@/components/ui/Button';
import { UploadFile } from '@/components/ui/Icons/UploadFile';
import { Loader } from '@/components/ui/Loader';
import { Modal } from '@/components/ui/Modal';
import { Textarea } from '@/components/ui/Textarea';
import { Typhography } from '@/components/ui/Typhography';
import { MODERATOR_ROLE } from '@/utils/constants/userRoles';
import { formatText } from '@/utils/helpers/formatText';
import { usePostModeratorAddHomeworkClassMutation } from '@/utils/redux/apiSlices/schedule/scheduleApi';
import { getUserRole } from '@/utils/redux/storeSlices/user/selectors';

interface ModeratorBlockProps {
  apiData: OutputClass;
  addHomework: (homework: RestructHomeworkElement) => void;
}

export const AddLessonHomework = ({ apiData, addHomework }: ModeratorBlockProps) => {
  const userRole = useSelector(getUserRole);
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

        {userRole >= MODERATOR_ROLE && (
          <Button variant="logo" onClick={() => getAddFileModal(true)}>
            <UploadFile />
          </Button>
        )}

        <Modal showInfo={addFileModal} showDetails={() => getAddFileModal(false)}>
          <UploadFiles addHomeworkFile={pushFiles} onClose={() => getAddFileModal(false)} />
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
