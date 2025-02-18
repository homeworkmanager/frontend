import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { admin, moderatorDesktop, moderatorMobile, note } from '../Router/constants/routes';

import styles from './Header.module.css';
import { AdminLogo } from '@/components/ui/Icons/Admin';
import { ModeratorLogo } from '@/components/ui/Icons/Moderator';
import { NoteLogo } from '@/components/ui/Icons/Note';
// import { SettingsLogo } from '@/components/ui/Icons/Settings';
import { Typhography } from '@/components/ui/Typhography';
import { AdminRole, ModeratorRole } from '@/utils/constants/userRoles';
import { JournalChooseMedia, ModeratorChooseMedia } from '@/utils/helpers/ChooseMedia';
import { getUser } from '@/utils/redux/storeSlices/userSlice/selectors';
import clsx from 'clsx';

export const Header = () => {
  const { role, group_name } = useSelector(getUser);
  const page = useLocation().pathname;

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
          <Link to="/admin">
            <AdminLogo className={clsx(styles['icon'], page === admin && styles['current'])} />
          </Link>
        )}
        {role >= ModeratorRole && (
          <Link to={ModeratorChooseMedia}>
            <ModeratorLogo
              className={clsx(
                styles['add-icon'],
                (page === moderatorMobile || page === moderatorDesktop) && styles['current']
              )}
            />
          </Link>
        )}

        <Link to="/note">
          <NoteLogo className={clsx(styles['icon'], page === note && styles['current'])} />
        </Link>

        {/* <Link to="/profile">
          <SettingsLogo className={styles['icon']} />
        </Link> */}
      </div>
    </header>
  );
};
