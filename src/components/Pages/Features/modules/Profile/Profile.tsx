import { useSelector } from 'react-redux';

import styles from './Profile.module.css';
import { routerNavigator } from '@/components/modules/Router/Navigator';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { Typhography } from '@/components/ui/Typhography';
import { cookieKey } from '@/utils/configs/cookie.config';
import { UNIHELPER_DB_CONFIG } from '@/utils/configs/db.config';
import { auth } from '@/utils/configs/routes.config';
import IndexedDBService from '@/utils/db/core';
import { deleteCookie } from '@/utils/helpers/deleteCookie';
import { noteApi } from '@/utils/redux/apiSlices/noteApiSlice/noteApi';
import { scheduleApi } from '@/utils/redux/apiSlices/scheduleApiSlice/scheduleApi';
import { useDeleteLogoutMutation } from '@/utils/redux/apiSlices/userApiSlice/userApi';
import { useAppDispatch } from '@/utils/redux/store';
import { getUser } from '@/utils/redux/storeSlices/userSlice/selectors';
import { logOut } from '@/utils/redux/storeSlices/userSlice/slice';

export const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(getUser);

  const [deleteLogout, deleteLogoutState] = useDeleteLogoutMutation();

  const logoutUser = async () => {
    const deleteLogoutResponse = await deleteLogout({});

    if (deleteLogoutResponse.error) {
      // eslint-disable-next-line no-console
      console.error(deleteLogoutResponse);
      return;
    }

    IndexedDBService.dropDataBase(UNIHELPER_DB_CONFIG);
    deleteCookie(cookieKey);

    dispatch(scheduleApi.util.invalidateTags(['GetAllSchedule']));
    dispatch(noteApi.util.invalidateTags(['GetNote']));

    routerNavigator.to(auth, { replace: true });
    dispatch(logOut());
  };

  return (
    <section className={styles['content']}>
      <div className={styles['user-info']}>
        <Typhography tag="h3" variant="secondary" className={styles['fio']} children={`${user.name} ${user.surname}`} />
        <Typhography tag="h4" variant="secondary" className={styles['group']} children={`${user.group_name}`} />
      </div>
      <Typhography tag="p" variant="small" className={styles['email']} children={user.email} />

      <Button variant="attention" color="warn" onClick={logoutUser}>
        {deleteLogoutState.isLoading ? <Loader /> : 'Выйти из аккаунта'}
      </Button>
    </section>
  );
};
