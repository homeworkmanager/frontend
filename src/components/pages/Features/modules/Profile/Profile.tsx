import { useSelector } from 'react-redux';

import styles from './Profile.module.css';
import { routerNavigator } from '@/components/modules/Router/Navigator';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { Typhography } from '@/components/ui/Typhography';
import { AUTH } from '@/utils/constants/routes';
import { OFFLINE_ROLE } from '@/utils/constants/userRoles';
import { useDeleteLogoutMutation } from '@/utils/redux/apiSlices/user/userApi';
import { getUser } from '@/utils/redux/storeSlices/user/selectors';

export const Profile = () => {
  const user = useSelector(getUser);

  const [deleteLogout, deleteLogoutState] = useDeleteLogoutMutation();

  const logoutUser = async () => {
    const deleteLogoutResponse = await deleteLogout({});

    if (!deleteLogoutResponse.error) {
      // eslint-disable-next-line no-console
      console.error(deleteLogoutResponse);
      return;
    }

    routerNavigator.to(AUTH, { replace: true });
  };

  return (
    <section className={styles['content']}>
      <div className={styles['user-info']}>
        <Typhography tag="h3" variant="secondary" className={styles['fio']} children={`${user.name} ${user.surname}`} />
        <Typhography tag="h4" variant="secondary" className={styles['group']} children={`${user.group_name}`} />
      </div>
      <Typhography tag="p" variant="small" className={styles['email']} children={user.email} />

      <Button disabled={user.role === OFFLINE_ROLE} variant="attention" color="warn" onClick={logoutUser}>
        {deleteLogoutState.isLoading ? <Loader /> : 'Выйти из аккаунта'}
      </Button>
    </section>
  );
};
