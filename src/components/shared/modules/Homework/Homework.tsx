import React from 'react';
import { useSelector } from 'react-redux';

import styles from './Homework.module.css';
import { AddHomeworkFile } from '@/components/shared/modules/molecules/AddHomeworkFile/AddHomeworkFile';
import { ChangeHomework } from '@/components/shared/modules/molecules/ChangeHomework/ChangeHomework';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { ChangeLogo } from '@/components/ui/Icons/Change';
import { DeleteLogo } from '@/components/ui/Icons/Delete';
import { DownloadFile } from '@/components/ui/Icons/DownloadFile';
import { UploadFile } from '@/components/ui/Icons/UploadFile';
import { Loader } from '@/components/ui/Loader';
import { Modal } from '@/components/ui/Modal';
import { MultiList } from '@/components/ui/MultiList/MultiList';
import { Typhography } from '@/components/ui/Typhography';
import { MODERATOR_ROLE, OFFLINE_ROLE } from '@/utils/configs/userRoles.config';
import { addDataAttr } from '@/utils/helpers/addDataAttr';
import { useDropdown } from '@/utils/hooks/useDropdown';
import { useDeleteModeratorHomeworkMutation, usePostHomeworkStatusMutation } from '@/utils/redux/apiSlices/schedule';
import { getUserRole } from '@/utils/redux/storeSlices/user/selectors';
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

  const [deleteModeratorHomeworkMutation, deleteHomeworkState] = useDeleteModeratorHomeworkMutation();
  const [postHomeworkStatusMutation, postHomeworkStatusState] = usePostHomeworkStatusMutation();

  const { menuRef, isOpen, action, preventDropdown } = useDropdown();

  const [showFileModal, getShowFileModal] = React.useState(false);

  const showChangeSection = () => {
    action.toggle();
    if (updateHeight !== undefined) updateHeight();
  };

  const hideChangeSection = () => {
    action.close();
    if (updateHeight !== undefined) updateHeight();
  };

  const deleteLessonHomework = async (homework: RestructHomeworkElement) => {
    const response = await deleteModeratorHomeworkMutation({ params: { homeworkID: homework.homeworkID } });

    if (!response.error) {
      deleteHomework(homework);
      hideChangeSection();
    }
  };

  const changeLessonHomeworkStatus = async (homework: RestructHomeworkElement) => {
    const response = await postHomeworkStatusMutation({
      params: { homeworkID: homework.homeworkID, status: !homework.isCompleted }
    });

    if (!response.error) {
      changeHomeworkStatus(homework);
    }
  };

  return (
    <>
      <MultiList.Row>
        <MultiList.Column icons={userRole >= MODERATOR_ROLE ? 3 : 1}>
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
              disabled={userRole === OFFLINE_ROLE}
              checked={homework.isCompleted}
              onChange={() => changeLessonHomeworkStatus(homework)}
            />
          )}
          {userRole >= MODERATOR_ROLE && (
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
                  deleteHomeworkState.isLoading ? (
                    <Loader spinnerSize={28} className={styles['loader']} />
                  ) : (
                    <DeleteLogo className={styles['delete-icon']} />
                  )
                }
              />
            </>
          )}
        </MultiList.Column>
      </MultiList.Row>
      <MultiList.Row>
        <MultiList.Column>
          <div className={styles['files']}>
            <Button variant="logo">
              <DownloadFile />
            </Button>
            {userRole >= MODERATOR_ROLE && (
              <Button variant="logo" onClick={() => getShowFileModal(true)}>
                <UploadFile />
              </Button>
            )}
            <Modal showInfo={showFileModal} showDetails={() => getShowFileModal(false)}>
              <AddHomeworkFile homework={homework} onClose={() => getShowFileModal(false)} />
            </Modal>
          </div>
        </MultiList.Column>
      </MultiList.Row>
      <AnimatePresence>
        {isOpen && (
          <div ref={menuRef}>
            <ChangeHomework
              currentHomework={homework}
              removeCurrentHomework={hideChangeSection}
              changeHomework={changeHomework}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
