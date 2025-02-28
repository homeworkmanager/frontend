import styles from './AdminPanel.module.css';
import { AddGroupForm } from './modules/AddGroup/AddGroupForm';
import { GroupsKeys } from './modules/GroupsKeys/GroupsKeys';
import { ScheduleAction } from './modules/ScheduleAction/ScheduleAction';
import { Users } from './modules/Users/Users';
import { Typhography } from '@/components/ui/Typhography';
import clsx from 'clsx';

export const AdminPanel = () => {
  return (
    <article className={styles.container}>
      <Typhography
        tag="h2"
        variant="header"
        children="Панель администратора"
        className={clsx(styles['title'], styles['content'])}
      />
      <div className={styles['content']}>
        <AddGroupForm />
        <ScheduleAction />
        <Users />
        <GroupsKeys />
      </div>
    </article>
  );
};
