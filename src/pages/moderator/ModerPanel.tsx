import styles from './ModerPanel.module.css';
import { KeyRefresh } from '@/shared/modules/molecules/KeyRefresh';
import { useGetModeratorKeyQuery } from '@/utils/redux/apiSlices/group/groupApi';

export default function ModerPanel() {
  const getModeatorKey = useGetModeratorKeyQuery(undefined);

  return (
    <article className={styles.container}>
      <div className={styles['content']}>
        {getModeatorKey.isSuccess && <KeyRefresh currentKey={getModeatorKey.data?.register_key} />}
        {getModeatorKey.isLoading && <div className={styles['loader']} />}
      </div>
    </article>
  );
}
