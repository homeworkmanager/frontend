import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { addHomeworkDesktop, addHomeworkMobile, note, profile } from '../Router/constants/routes';

import styles from './Header.module.css';
import { HomeworkLogo } from '@/components/ui/Icons/Homework';
import { NoteLogo } from '@/components/ui/Icons/Note';
import { ProfileLogo } from '@/components/ui/Icons/Profile';
import { Typhography } from '@/components/ui/Typhography';
import { ModeratorRole } from '@/utils/constants/userRoles';
import { AddHomeworkChooseMedia, JournalChooseMedia } from '@/utils/helpers/ChooseMedia';
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
        {role >= ModeratorRole && (
          <Link to={AddHomeworkChooseMedia}>
            <HomeworkLogo
              className={clsx(
                styles['icon'],
                styles['homework'],
                (page === addHomeworkMobile || page === addHomeworkDesktop) && styles['current']
              )}
            />
          </Link>
        )}

        <Link to="/note">
          <NoteLogo className={clsx(styles['icon'], styles['note'], page === note && styles['current'])} />
        </Link>
        <Link to="/profile">
          <ProfileLogo className={clsx(styles['icon'], styles['note'], page === profile && styles['current'])} />
        </Link>
      </div>
    </header>
  );
};
