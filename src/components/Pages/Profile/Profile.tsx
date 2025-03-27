import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Profile.module.css';
import { admin, auth, moder } from '@/components/modules/Router/constants/routes';
import { Button } from '@/components/ui/Button';
import { AdminLogo } from '@/components/ui/Icons/Admin';
import { ModerLogo } from '@/components/ui/Icons/Moder';
import { Loader } from '@/components/ui/Loader';
import { Typhography } from '@/components/ui/Typhography';
import { cookieExpires, cookieKey } from '@/utils/constants/cookieNames';
import { AdminRole, ModeratorRole } from '@/utils/constants/userRoles';
import { deleteCookie } from '@/utils/helpers/deleteCookie';
import { useDeleteLogoutMutation } from '@/utils/redux/apiSlices/userApiSlice/userApi';
import { useAppDispatch } from '@/utils/redux/store';
import { getUser } from '@/utils/redux/storeSlices/userSlice/selectors';
import { logOut } from '@/utils/redux/storeSlices/userSlice/slice';
import clsx from 'clsx';

export const ProfileSettings = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useSelector(getUser);

  const [deleteLogout, deleteLogoutState] = useDeleteLogoutMutation();

  const logoutUser = async () => {
    const deleteLogoutResponse = await deleteLogout({});

    if (deleteLogoutResponse.error) {
      // eslint-disable-next-line no-console
      console.error(deleteLogoutResponse);
      return;
    }

    deleteCookie(cookieKey);
    deleteCookie(cookieExpires);
    dispatch(logOut());

    navigate(auth, { replace: true });
  };

  return (
    <article className={styles.container}>
      <div className={styles['content']}>
        <div className={styles['user-info']}>
          <Typhography
            tag="h3"
            variant="secondary"
            className={styles['fio']}
            children={`${user.name} ${user.surname}`}
          />
          <Typhography tag="h4" variant="secondary" className={styles['group']} children={`${user.group_name}`} />
        </div>
        <Typhography tag="p" variant="small" className={styles['email']} children={user.email} />

        <div className={styles['actions']}>
          <Button variant="attention" color="warn" onClick={logoutUser}>
            {deleteLogoutState.isLoading ? <Loader /> : 'Выйти из аккаунта'}
          </Button>
          {user.role === AdminRole && (
            <Link to={admin}>
              <AdminLogo className={styles['icon']} />
            </Link>
          )}

          {user.role === ModeratorRole && (
            <Link to={moder}>
              <ModerLogo className={clsx(styles['icon'], styles['moder'])} />
            </Link>
          )}
        </div>
        <Typhography tag="p" variant="secondary" className={styles['theme']} children={<span>Тема</span>} />

        <div className={styles['theme-actions']}>
          <Button variant="attention" onClick={() => {}} className={clsx(styles['active'])} children="Тёмная" />
          <Button variant="attention" onClick={() => {}} className={styles['temp']} children="Скоро" />
        </div>
      </div>
    </article>
  );
};
