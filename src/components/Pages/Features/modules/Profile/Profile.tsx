import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Profile.module.css';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { Typhography } from '@/components/ui/Typhography';
import { cookieExpires, cookieKey } from '@/utils/configs/cookieNames.config';
import { auth } from '@/utils/configs/routes.config';
import { deleteCookie } from '@/utils/helpers/deleteCookie';
import { useDeleteLogoutMutation } from '@/utils/redux/apiSlices/userApiSlice/userApi';
import { useAppDispatch } from '@/utils/redux/store';
import { getUser } from '@/utils/redux/storeSlices/userSlice/selectors';
import { logOut } from '@/utils/redux/storeSlices/userSlice/slice';

export const Profile = () => {
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
