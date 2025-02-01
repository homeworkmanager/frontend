import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';
import { AddLogo } from '@/components/ui/Icons/Add';
import { AdminLogo } from '@/components/ui/Icons/Admin';
import { NoteLogo } from '@/components/ui/Icons/Note';
// import { SettingsLogo } from '@/components/ui/Icons/Settings';
import { Typhography } from '@/components/ui/Typhography';
import { AdminRole, ModeratorRole } from '@/utils/constants/userRoles';
import { JournalChooseMedia, ModeratorChooseMedia } from '@/utils/helpers/ChooseMedia';
import { getUser } from '@/utils/redux/storeSlices/userSlice/selectors';

export const Header = () => {
  const { role, group_name } = useSelector(getUser);

  return (
    <header className={styles.header}>
      <Link to={JournalChooseMedia} replace>
        <Typhography tag="h1" variant="header" children={group_name} />
      </Link>

      <div className={styles.container}>
        {role === AdminRole && (
          <Link to="/admin">
            <AdminLogo className={styles['icon']} />
          </Link>
        )}
        {role >= ModeratorRole && (
          <Link to={ModeratorChooseMedia}>
            <AddLogo className={styles['add-icon']} />
          </Link>
        )}

        <Link to="/note">
          <NoteLogo className={styles['icon']} />
        </Link>

        {/* <Link to="/profile">
          <SettingsLogo className={styles['icon']} />
        </Link> */}
      </div>
    </header>
  );
};
