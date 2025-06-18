import styles from './ModerPanel.module.css';
import { KeyRefresh } from '@/components/shared/modules/molecules/KeyRefresh/KeyRefresh.module';
import { useGetModeratorKeyQuery } from '@/utils/redux/apiSlices/group/groupApi';

export const ModerPanel = () => {
  const getModeatorKey = useGetModeratorKeyQuery(undefined);

  return (
    <article className={styles.container}>
      <div className={styles['content']}>
        {getModeatorKey.isSuccess && <KeyRefresh currentKey={getModeatorKey.data?.register_key} />}
        {getModeatorKey.isLoading && <div className={styles['loader']} />}
      </div>
    </article>
  );
};
