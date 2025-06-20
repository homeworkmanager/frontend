import styles from './GroupsKeys.module.css';
import { KeyRefresh } from '@/components/shared/modules/molecules/KeyRefresh/KeyRefresh.module';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { Typhography } from '@/components/ui/Typhography';
import { useGetAdminGroupsQuery, usePatchAdminKeysRegenerateMutation } from '@/utils/redux/apiSlices/group/groupApi';

export const GroupsKeys = () => {
  const getAdminGroupsResponse = useGetAdminGroupsQuery(undefined);

  const [patchAdminKeysRegenerate, patchAdminKeysRegenerateState] = usePatchAdminKeysRegenerateMutation();

  const refreshAll = async () => {
    const response = await patchAdminKeysRegenerate({});

    // eslint-disable-next-line no-console
    if (response.error) console.log(response.error);
  };

  return (
    <div className={styles['container']}>
      <Typhography tag="h3" variant="primary" children="Ключи" className={styles['title']} />
      <Button
        variant="accept"
        className={styles['all']}
        onClick={refreshAll}
        children={patchAdminKeysRegenerateState.isLoading ? <Loader /> : 'Обновить все'}
      />
      {(patchAdminKeysRegenerateState.isUninitialized || patchAdminKeysRegenerateState.isSuccess) && (
        <ul className={styles['keys']}>
          {getAdminGroupsResponse.data?.map((group) => (
            <li key={group.group_id} className={styles['group']}>
              <Typhography tag="p" variant="thirdy" className={styles['group-name']} children={group.group_name} />
              <KeyRefresh currentKey={group.register_key} groupId={group.group_id} hideLabel={true} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
