import React from 'react';

import styles from './ScheduleAction.module.css';
import { Button } from '@/shared/ui/Button';
import { Loader } from '@/shared/ui/Loader';
import { Modal } from '@/shared/ui/Modal';
import { Typhography } from '@/shared/ui/Typhography';
import {
  usePatchAdminRefreshAllDataMutation,
  usePatchAdminUpdateClassesMutation} from '@/utils/store/middleware/endpoints/schedule';
import { motion } from 'framer-motion';

export const ScheduleAction = () => {
  const [patchAdminUpdateClasses, patchAdminUpdateClassesState] = usePatchAdminUpdateClassesMutation();
  const [patchAdminRefreshAllData, patchAdminRefreshAllDataState] = usePatchAdminRefreshAllDataMutation();

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const updateSchedule = async () => {
    await patchAdminUpdateClasses({});
  };

  const refreshData = async () => {
    await patchAdminRefreshAllData({});
  };

  const onRefreshClick = () => setIsModalOpen((prev) => !prev);

  return (
    <div className={styles['schedule']}>
      <Typhography tag="h3" variant="primary" children="Управление расписанием" className={styles['title']} />
      <div className={styles['schedule-item']}>
        <Button
          variant="accept"
          type="submit"
          disabled={patchAdminUpdateClassesState.isLoading}
          children={patchAdminUpdateClassesState.isLoading ? <Loader /> : 'Обновить расписание'}
          onClick={updateSchedule}
        />
        {patchAdminUpdateClassesState.isError && <p className={styles['error']}>Произошла ошибка</p>}
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
            disabled={patchAdminRefreshAllDataState.isLoading}
            children={patchAdminRefreshAllDataState.isLoading ? <Loader /> : 'Стереть'}
            onClick={refreshData}
          />
          {patchAdminRefreshAllDataState.isError && <p className={styles['error']}>Произошла ошибка</p>}
        </motion.section>
      </Modal>
    </div>
  );
};
