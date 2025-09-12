import styles from './AdminPanel.module.css';
import { AddGroupForm } from './components/AddGroup';
import { GroupsKeys } from './components/GroupsKeys';
import { ScheduleAction } from './components/ScheduleAction';
import { Users } from './components/Users';

export default function AdminPanel() {
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
}
