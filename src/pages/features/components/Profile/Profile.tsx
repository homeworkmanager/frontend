import { useSelector } from 'react-redux';

import styles from './Profile.module.css';
import { routerNavigator } from '@/app/modules/Navigator';
import { Button } from '@/shared/ui/Button';
import { Loader } from '@/shared/ui/Loader';
import { Typhography } from '@/shared/ui/Typhography';
import { PAGES } from '@/utils/constants/pages';
import { USER_ROLES } from '@/utils/constants/userRoles';
import { useDeleteLogoutMutation } from '@/utils/store/middleware/endpoints/user';
import { getUser } from '@/utils/store/slices/user/selectors';

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

    routerNavigator.to(PAGES.AUTH, { replace: true });
  };

  return (
    <section className={styles['content']}>
      <div className={styles['user-info']}>
        <Typhography tag="h3" variant="secondary" className={styles['fio']} children={`${user.name} ${user.surname}`} />
        <Typhography tag="h4" variant="secondary" className={styles['group']} children={`${user.group_name}`} />
      </div>
      <Typhography tag="p" variant="small" className={styles['email']} children={user.email} />

      <Button disabled={user.role === USER_ROLES.OFFLINE} variant="attention" color="warn" onClick={logoutUser}>
        {deleteLogoutState.isLoading ? <Loader /> : 'Выйти из аккаунта'}
      </Button>
    </section>
  );
};
