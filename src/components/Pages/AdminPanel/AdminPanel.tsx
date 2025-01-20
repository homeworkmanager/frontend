import React from 'react';

import { Header } from '../../modules/Header/Header';

import styles from './AdminPanel.module.css';
import { useAdminForm } from './hooks/useAdminForm';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loader } from '@/components/ui/Loader';
import { Modal } from '@/components/ui/Modal';
import { Typhography } from '@/components/ui/Typhography';
import {
  usePatchAdminRefreshAllDataMutation,
  usePatchAdminUpdateClassesMutation
} from '@/utils/redux/apiSlices/adminApiSlice/adminApi';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export const AdminPanel = () => {
  const { form, state } = useAdminForm();
  const [isOpen, setIsOpen] = React.useState(false);

  const [patchAdminUpdateClassesMutation, { isLoading: updateIsLoading, isError: updateIsError }] =
    usePatchAdminUpdateClassesMutation();
  const [patchAdminRefreshAllDataMutation, { isLoading: refreshIsLoading, isError: refreshIsError }] =
    usePatchAdminRefreshAllDataMutation();

  const updateSchedule = async () => {
    await patchAdminUpdateClassesMutation({});
  };

  const refreshData = async () => {
    await patchAdminRefreshAllDataMutation({});
  };

  const onRefreshClick = () => setIsOpen((prev) => !prev);

  return (
    <article className={styles.container} id="admin">
      <Header />
      <Typhography
        tag="h2"
        variant="header"
        children="Панель администратора"
        className={clsx(styles['title'], styles['content'])}
      />
      <div className={styles['content']}>
        <form className={styles['form']} onSubmit={form.handleSubmit}>
          <Typhography tag="h3" variant="primary" children="Добавление групп" className={styles['title']} />
          <Input
            type="text"
            placeholder="название"
            label={'Группа'}
            variant={'primary'}
            name={'adminGroup'}
            className={styles['group']}
            value={form.values.adminGroup.replace(' ', '').toUpperCase()}
            onChange={form.handleChange}
            {...(form.errors.adminGroup && { error: form.errors.adminGroup })}
          />
          <Input
            type="text"
            maxLength={1}
            placeholder="курс"
            label={'Курс'}
            variant={'primary'}
            name={'adminCourse'}
            className={styles['group']}
            value={form.values.adminCourse.replace(' ', '').replace(/\D/g, '')}
            onChange={form.handleChange}
            {...(form.errors.adminCourse && { error: form.errors.adminGroup })}
          />
          <Input
            type="text"
            placeholder="ссылка"
            label={'Ссылка на ical'}
            variant={'primary'}
            name={'adminIcal'}
            className={styles['ical']}
            value={form.values.adminIcal.replace(' ', '').replace('webcal', 'http')}
            onChange={form.handleChange}
            {...(form.errors.adminIcal && { error: form.errors.adminIcal })}
          />
          <Button
            variant="accept"
            type="submit"
            disabled={state.isLoading}
            children={state.isLoading ? <Loader /> : 'Добавить группу'}
          />
          {state.isError && <p className={styles['error']}>Произошла ошибка</p>}
        </form>
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
        </div>
      </div>
      <Modal modalId="admin" showInfo={isOpen} showDetails={onRefreshClick}>
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
    </article>
  );
};
