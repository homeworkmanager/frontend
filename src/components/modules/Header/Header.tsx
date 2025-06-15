import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import styles from './Header.module.css';
import { AddHomeworkLogo } from '@/components/ui/Icons/AddHomework';
import { FeaturesLogo } from '@/components/ui/Icons/Features';
import { HomeworkLogo } from '@/components/ui/Icons/Homework';
import { NoteLogo } from '@/components/ui/Icons/Note';
import { Typhography } from '@/components/ui/Typhography';
import {
  ADD_HOMEWORK_DESKTOP,
  ADD_HOMEWORK_MOBILE,
  AGGREGATE_HOMEWORK,
  FEATURES,
  NOTE
} from '@/utils/constants/routes';
import { MODERATOR_ROLE } from '@/utils/constants/userRoles';
import { AddHomeworkChooseMedia, JournalChooseMedia } from '@/utils/helpers/ChooseMedia';
import { getUser } from '@/utils/redux/storeSlices/user/selectors';
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
        {role >= MODERATOR_ROLE && (
          <Link to={AddHomeworkChooseMedia}>
            <AddHomeworkLogo
              className={clsx(
                styles['icon'],
                styles['homework'],
                (page === ADD_HOMEWORK_MOBILE || page === ADD_HOMEWORK_DESKTOP) && styles['current']
              )}
            />
          </Link>
        )}

        <Link to={AGGREGATE_HOMEWORK}>
          <HomeworkLogo
            className={clsx(styles['icon'], styles['note'], page.split('/')[1] === 'aggregate' && styles['current'])}
          />
        </Link>

        <Link to={NOTE}>
          <NoteLogo className={clsx(styles['icon'], styles['note'], page === NOTE && styles['current'])} />
        </Link>
        <Link to={FEATURES}>
          <FeaturesLogo className={clsx(styles['icon'], styles['features'], page === FEATURES && styles['current'])} />
        </Link>
      </nav>
    </header>
  );
};
