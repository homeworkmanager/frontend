import styles from './ModerPanel.module.css';
import { KeyRefresh } from './modules/KeyRefresh/KeyRefresh.module';
import { Typhography } from '@/components/ui/Typhography';
import { useGetModeratorKeyQuery } from '@/utils/redux/apiSlices/keyApiSlice/keyApi';

export const ModerPanel = () => {
  const getModeatorKey = useGetModeratorKeyQuery(undefined);

  return (
    <article className={styles.container}>
      <Typhography tag="h2" variant="header" children="Панель модератора" />
      {getModeatorKey.isSuccess && <KeyRefresh currentKey={getModeatorKey.data?.register_key} />}
      {getModeatorKey.isLoading && <div className={styles['loader']} />}
    </article>
  );
};
