import styles from './ModerPanel.module.css';
import { KeyRefresh } from '@/components/shared/modules/KeyRefresh/KeyRefresh.module';
import { Typhography } from '@/components/ui/Typhography';
import { useGetModeratorKeyQuery } from '@/utils/redux/apiSlices/groupApiSlice/groupApi';

export const ModerPanel = () => {
  const getModeatorKey = useGetModeratorKeyQuery(undefined);

  return (
    <article className={styles.container}>
      <Typhography tag="h2" variant="header" children="Панель модератора" />
      <div className={styles['env']}>
        {getModeatorKey.isSuccess && <KeyRefresh currentKey={getModeatorKey.data?.register_key} />}
        {getModeatorKey.isLoading && <div className={styles['loader']} />}
      </div>
    </article>
  );
};
