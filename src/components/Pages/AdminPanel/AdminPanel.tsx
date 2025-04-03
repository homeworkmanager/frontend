import styles from './AdminPanel.module.css';
import { AddGroupForm } from './modules/AddGroup/AddGroupForm';
import { GroupsKeys } from './modules/GroupsKeys/GroupsKeys';
import { ScheduleAction } from './modules/ScheduleAction/ScheduleAction';
import { Users } from './modules/Users/Users';

export const AdminPanel = () => {
  return (
    <article className={styles.container}>
      <div className={styles['content']}>
        <AddGroupForm />
        <ScheduleAction />
        <Users />
        <GroupsKeys />
      </div>
    </article>
  );
};
