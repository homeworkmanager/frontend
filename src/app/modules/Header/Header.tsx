import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import styles from './Header.module.css';
import { AddHomeworkLogo } from '@/shared/Icons/AddHomework';
import { FeaturesLogo } from '@/shared/Icons/Features';
import { HomeworkLogo } from '@/shared/Icons/Homework';
import { NoteLogo } from '@/shared/Icons/Note';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Typhography } from '@/shared/ui/Typhography';
import { PAGES } from '@/utils/constants/pages';
import { USER_ROLES } from '@/utils/constants/userRoles';
import { AddHomeworkChooseMedia, JournalChooseMedia } from '@/utils/services/chooseMedia';
import { getUser } from '@/utils/store/slices/user/selectors';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export const Header = () => {
  const { role, group_name, name } = useSelector(getUser);

  const page = useLocation().pathname;

  return (
    <header className={styles.header}>
      {!name && (
        <Skeleton
          height="1.75rem"
          width="9.25rem"
          radius="1rem"
          className={clsx(styles['journal'], page.split('-')[0] === '/journal' && styles['current'])}
        />
      )}
      {!!name && (
        <Link to={JournalChooseMedia} replace>
          <Typhography
            tag="h1"
            variant="header"
            className={clsx(styles['journal'], page.split('-')[0] === '/journal' && styles['current'])} //для всех страниц journal (в том числе вложенных)
            children={
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.25,
                  ease: 'easeInOut'
                }}
              >
                {group_name}
              </motion.span>
            }
          />
        </Link>
      )}

      <nav className={styles.container}>
        {role >= USER_ROLES.MODERATOR && (
          <Link to={AddHomeworkChooseMedia}>
            <AddHomeworkLogo
              className={clsx(
                styles['icon'],
                styles['homework'],
                (page === PAGES.ADD_HOMEWORK_MOBILE || page === PAGES.ADD_HOMEWORK_DESKTOP) && styles['current']
              )}
            />
          </Link>
        )}

        <Link to={PAGES.AGGREGATE_HOMEWORK}>
          <HomeworkLogo
            className={clsx(styles['icon'], styles['note'], page.split('/')[1] === 'aggregate' && styles['current'])}
          />
        </Link>

        <Link to={PAGES.NOTE}>
          <NoteLogo className={clsx(styles['icon'], styles['note'], page === PAGES.NOTE && styles['current'])} />
        </Link>
        <Link to={PAGES.FEATURES}>
          <FeaturesLogo
            className={clsx(styles['icon'], styles['features'], page === PAGES.FEATURES && styles['current'])}
          />
        </Link>
      </nav>
    </header>
  );
};
