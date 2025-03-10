import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { addHomeworkDesktop, addHomeworkMobile, admin, auth, moder, note } from '../Router/constants/routes';

import styles from './Header.module.css';
import { Button } from '@/components/ui/Button';
import { AdminLogo } from '@/components/ui/Icons/Admin';
import { HomeworkLogo } from '@/components/ui/Icons/Homework';
import { LogoutLogo } from '@/components/ui/Icons/Logout';
import { ModerLogo } from '@/components/ui/Icons/Moder';
import { NoteLogo } from '@/components/ui/Icons/Note';
import { Loader } from '@/components/ui/Loader';
import { Typhography } from '@/components/ui/Typhography';
import { AdminRole, ModeratorRole } from '@/utils/constants/userRoles';
import { AddHomeworkChooseMedia, isMobile, JournalChooseMedia } from '@/utils/helpers/ChooseMedia';
import { deleteCookie } from '@/utils/helpers/deleteCookie';
import { useDeleteLogoutMutation } from '@/utils/redux/apiSlices/userApiSlice/userApi';
import { getUser } from '@/utils/redux/storeSlices/userSlice/selectors';
import clsx from 'clsx';

export const Header = () => {
  const { role, group_name } = useSelector(getUser);
  const page = useLocation().pathname;
  const navigate = useNavigate();

  const [deleteLogout, deleteLogoutState] = useDeleteLogoutMutation();

  const logoutUser = async () => {
    const deleteLogoutResponse = await deleteLogout({});

    if (deleteLogoutResponse.error) {
      // eslint-disable-next-line no-console
      console.error(deleteLogoutResponse);
      return;
    }

    deleteCookie('session_key');
    deleteCookie('session_expires');

    navigate(auth, { replace: true });
  };

  const isDesktop = !isMobile;

  return (
    <header className={styles.header}>
      <Link to={JournalChooseMedia} replace>
        <Typhography
          tag="h1"
          variant="header"
          className={clsx(styles['journal'], page.split('-')[0] === '/journal' && styles['current'])} //для всех страниц journal (в том числе вложенных)
          children={group_name}
        />
      </Link>

      <div className={styles.container}>
        {role === AdminRole && (
          <Link to={admin}>
            <AdminLogo
              className={clsx(styles['icon'], isDesktop && styles['hover'], page === admin && styles['current'])}
            />
          </Link>
        )}

        {role === ModeratorRole && (
          <Link to={moder}>
            <ModerLogo
              className={clsx(
                styles['icon'],
                isDesktop && styles['hover'],
                styles['moder'],
                page === moder && styles['current']
              )}
            />
          </Link>
        )}

        {role >= ModeratorRole && (
          <Link to={AddHomeworkChooseMedia}>
            <HomeworkLogo
              className={clsx(
                styles['icon'],
                isDesktop && styles['hover'],
                styles['homework'],
                (page === addHomeworkMobile || page === addHomeworkDesktop) && styles['current']
              )}
            />
          </Link>
        )}

        <Link to="/note">
          <NoteLogo
            className={clsx(
              styles['icon'],
              isDesktop && styles['hover'],
              styles['note'],
              page === note && styles['current']
            )}
          />
        </Link>

        <Button variant="slide" onClick={logoutUser}>
          {deleteLogoutState.isLoading ? (
            <Loader />
          ) : (
            <LogoutLogo className={clsx(styles['icon'], isDesktop && styles['hover'], styles['exit'])} />
          )}
        </Button>
      </div>
    </header>
  );
};
