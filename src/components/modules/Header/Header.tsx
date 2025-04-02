import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { addHomeworkDesktop, addHomeworkMobile, features, note } from '../../../utils/configs/routes.config';

import styles from './Header.module.css';
import { FeaturesLogo } from '@/components/ui/Icons/Features';
import { HomeworkLogo } from '@/components/ui/Icons/Homework';
import { NoteLogo } from '@/components/ui/Icons/Note';
import { Typhography } from '@/components/ui/Typhography';
import { ModeratorRole } from '@/utils/configs/userRoles.config';
import { AddHomeworkChooseMedia, JournalChooseMedia } from '@/utils/helpers/chooseMedia';
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

      <nav className={styles.container}>
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

        <Link to={note}>
          <NoteLogo className={clsx(styles['icon'], styles['note'], page === note && styles['current'])} />
        </Link>
        <Link to={features}>
          <FeaturesLogo className={clsx(styles['icon'], styles['features'], page === features && styles['current'])} />
        </Link>
      </nav>
    </header>
  );
};
