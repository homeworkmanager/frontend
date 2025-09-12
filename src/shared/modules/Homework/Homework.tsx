import React from 'react';
import { useSelector } from 'react-redux';

import { DownloadFiles } from '../molecules/DownloadFiles/DownloadFiles';

import styles from './Homework.module.css';
import { ChangeLogo } from '@/shared/Icons/Change';
import { DeleteLogo } from '@/shared/Icons/Delete';
import { DownloadFile } from '@/shared/Icons/DownloadFile';
import { UploadFile } from '@/shared/Icons/UploadFile';
import { ChangeHomework } from '@/shared/modules/molecules/ChangeHomework/ChangeHomework';
import { UploadFiles } from '@/shared/modules/molecules/UploadFiles/UploadFiles';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Loader } from '@/shared/ui/Loader';
import { Modal } from '@/shared/ui/Modal';
import { MultiList } from '@/shared/ui/MultiList/MultiList';
import { Toast } from '@/shared/ui/Toast/Toast';
import { Typhography } from '@/shared/ui/Typhography';
import { USER_ROLES } from '@/utils/constants/userRoles';
import { addDataAttr } from '@/utils/helpers/addDataAttr';
import { useDropdown } from '@/utils/hooks/useDropdown';
import {
  useDeleteModeratorHomeworkMutation,
  usePostHomeworkStatusMutation,
  usePostModeratorAddFileMutation
} from '@/utils/store/middleware/endpoints/schedule';
import { getUserRole } from '@/utils/store/slices/user/selectors';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';

interface HomeworkProps {
  homework: RestructHomeworkElement;
  index: number;
  updateHeight?: () => void;
  deleteHomework: (homework: RestructHomeworkElement) => void;
  changeHomework: (homework: RestructHomeworkElement) => void;
  changeHomeworkStatus: (homework: RestructHomeworkElement) => void;
}

export const Homework = ({
  homework,
  index,
  updateHeight,
  deleteHomework,
  changeHomework,
  changeHomeworkStatus
}: HomeworkProps) => {
  const userRole = useSelector(getUserRole);

  const [deleteModeratorHomework, deleteModeratorHomeworkState] = useDeleteModeratorHomeworkMutation();
  const [postHomeworkStatus, postHomeworkStatusState] = usePostHomeworkStatusMutation();
  const [postModeratorAddFile, postModeratorAddFileState] = usePostModeratorAddFileMutation();

  const { menuRef, isOpen, action, preventDropdown } = useDropdown();

  const [addFileModal, getAddFileModal] = React.useState(false);
  const [showFileModal, getShowFileModal] = React.useState(false);

  const [files, setFiles] = React.useState(homework.files);

  const showChangeSection = () => {
    action.toggle();
    if (updateHeight !== undefined) updateHeight();
  };

  const hideChangeSection = () => {
    action.close();
  };

  const deleteLessonHomework = async (homework: RestructHomeworkElement) => {
    const response = await deleteModeratorHomework({ params: { homeworkID: homework.homeworkID } });

    if (!response.error) {
      deleteHomework(homework);
      hideChangeSection();
    }
  };

  const changeLessonHomeworkStatus = async (homework: RestructHomeworkElement) => {
    const response = await postHomeworkStatus({
      params: { homeworkID: homework.homeworkID, status: !homework.isCompleted }
    });

    if (!response.error) {
      changeHomeworkStatus(homework);
    }
  };

  const addHomeworkFile = async (files: File[]) => {
    const response = await postModeratorAddFile({ params: { homeworkId: homework.homeworkID, files } });

    const serverData = response.data;

    if (!response.error && serverData?.data) {
      setFiles((prev) => [
        ...prev,
        ...Object.keys(serverData.filesIdMap).map((fileName) => {
          const fileId = serverData.filesIdMap[fileName];
          return {
            FileID: fileId,
            FileName: fileName,
            FileURL: serverData.filesURLMap[fileId],
            CreatedAt: new Date().toISOString()
          };
        })
      ]);
      getAddFileModal(false);
    }
  };

  const deleteHomeworkFile = (currFile: FileElem) => {
    setFiles((prev) => prev.filter((file) => file.FileID !== currFile.FileID));

    if (files.length === 1) getShowFileModal(false); //при длине в 1 т.к сеттер - асинхронный
  };

  return (
    <div className={styles['container']}>
      <MultiList.Row>
        <MultiList.Column icons={userRole >= USER_ROLES.MODERATOR ? 3 : 1}>
          <Typhography
            tag="p"
            variant="thirdy"
            className={clsx(styles['number'], homework.isCompleted && styles['number-complete'])}
            children={`${index + 1}.`}
          />
          <Typhography
            tag="p"
            variant="thirdy"
            className={clsx(styles['text'], homework.isCompleted && styles['complete'])}
            children={homework.homeworkText}
          />
        </MultiList.Column>
        <MultiList.Column>
          {postHomeworkStatusState.isLoading ? (
            <Loader spinnerSize={24} className={styles['loader']} />
          ) : (
            <Checkbox
              disabled={userRole === USER_ROLES.OFFLINE}
              checked={homework.isCompleted}
              onChange={() => changeLessonHomeworkStatus(homework)}
            />
          )}
          {userRole >= USER_ROLES.MODERATOR && (
            <>
              <Button
                {...addDataAttr(preventDropdown)}
                variant="logo"
                onClick={showChangeSection}
                children={<ChangeLogo className={clsx(styles['icon'], isOpen && styles['active'])} />}
              />
              <Button
                variant="logo"
                onClick={() => deleteLessonHomework(homework)}
                children={
                  deleteModeratorHomeworkState.isLoading ? (
                    <Loader spinnerSize={28} className={styles['loader']} />
                  ) : (
                    <DeleteLogo className={styles['delete-icon']} />
                  )
                }
              />
              {deleteModeratorHomeworkState.isError && <Toast type="mobile" text={'Ошибка удаления задания'} />}
            </>
          )}
        </MultiList.Column>
      </MultiList.Row>
      <MultiList.Row>
        <MultiList.Column>
          <div className={styles['files']}>
            {!!files && !!files.length && (
              <Button variant="logo" onClick={() => getShowFileModal(true)}>
                <DownloadFile />
              </Button>
            )}
            <Modal showInfo={showFileModal} showDetails={() => getShowFileModal(false)}>
              <DownloadFiles
                files={files}
                deleteHomeworkFile={deleteHomeworkFile}
                onClose={() => getShowFileModal(false)}
              />
            </Modal>
            {userRole >= USER_ROLES.MODERATOR && files.length < 10 && (
              <Button variant="logo" onClick={() => getAddFileModal(true)}>
                <UploadFile />
              </Button>
            )}
            <Modal showInfo={addFileModal} showDetails={() => getAddFileModal(false)}>
              <UploadFiles
                currentFilesCount={files.length}
                fileUploadState={postModeratorAddFileState}
                addHomeworkFile={addHomeworkFile}
                onClose={() => getAddFileModal(false)}
              />
            </Modal>
          </div>
        </MultiList.Column>
      </MultiList.Row>
      <AnimatePresence {...(updateHeight !== undefined && { onExitComplete: updateHeight })}>
        {isOpen && (
          <div ref={menuRef}>
            <ChangeHomework currentHomework={homework} onClose={hideChangeSection} changeHomework={changeHomework} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
