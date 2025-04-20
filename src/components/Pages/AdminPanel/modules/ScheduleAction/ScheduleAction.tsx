import React from 'react';

import styles from './ScheduleAction.module.css';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { Modal } from '@/components/ui/Modal';
import { Typhography } from '@/components/ui/Typhography';
import {
  usePatchAdminRefreshAllDataMutation,
  usePatchAdminUpdateClassesMutation
} from '@/utils/redux/apiSlices/schedule/scheduleApi';
import { motion } from 'framer-motion';

export const ScheduleAction = () => {
  const [patchAdminUpdateClassesMutation, { isLoading: updateIsLoading, isError: updateIsError }] =
    usePatchAdminUpdateClassesMutation();

  const [patchAdminRefreshAllDataMutation, { isLoading: refreshIsLoading, isError: refreshIsError }] =
    usePatchAdminRefreshAllDataMutation();

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const updateSchedule = async () => {
    await patchAdminUpdateClassesMutation({});
  };

  const refreshData = async () => {
    await patchAdminRefreshAllDataMutation({});
  };

  const onRefreshClick = () => setIsModalOpen((prev) => !prev);

  return (
    <div className={styles['schedule']}>
      <Typhography tag="h3" variant="primary" children="Управление расписанием" className={styles['title']} />
      <div className={styles['schedule-item']}>
        <Button
          variant="accept"
          type="submit"
          disabled={updateIsLoading}
          children={updateIsLoading ? <Loader /> : 'Обновить расписание'}
          onClick={updateSchedule}
        />
        {updateIsError && <p className={styles['error']}>Произошла ошибка</p>}
      </div>
      <div className={styles['schedule-item']}>
        <Button variant="accept" type="submit" children={'Стереть данные'} onClick={onRefreshClick} />
      </div>
      <Modal showInfo={isModalOpen} showDetails={onRefreshClick}>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles['modal-admin']}
        >
          <Typhography tag="h3" variant="primary" children="Вы уверены?" />
          <Typhography tag="p" variant="primary" children="Все данные будут стерты" />
          <Button
            variant="accept"
            type="submit"
            disabled={refreshIsLoading}
            children={refreshIsLoading ? <Loader /> : 'Стереть'}
            onClick={refreshData}
          />
          {refreshIsError && <p className={styles['error']}>Произошла ошибка</p>}
        </motion.section>
      </Modal>
    </div>
  );
};
