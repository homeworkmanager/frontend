import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Features.module.css';
import { admin, moder } from '@/utils/configs/routes.config';
import { AdminRole, ModeratorRole } from '@/utils/configs/userRoles.config';
import { getUserRole } from '@/utils/redux/storeSlices/userSlice/selectors';
import { Profile } from './modules/Profile/Profile';
import { Theme } from './modules/Theme/Theme';
import { Button } from '@/components/ui/Button';
import { AdminLogo } from '@/components/ui/Icons/Admin';
import { Typhography } from '@/components/ui/Typhography';
import { ModerLogo } from '@/components/ui/Icons/Moder';

export const ProfileSettings = () => {
  const role = useSelector(getUserRole);
  const navigate = useNavigate();

  return (
    <article className={styles.container}>
      <Profile />
      <div className={styles['content']}>
        {role === ModeratorRole && (
          <Link to={moder}>
            <Button
              variant="attention"
              className={styles['link']}
              onClick={() => navigate(moder)}
              children={
                <>
                  <ModerLogo className={styles['moder']} />
                  <Typhography tag="span" variant="thirdy" children="Панель модератора" />
                </>
              }
            />
          </Link>
        )}

        {role === AdminRole && (
          <Button
            variant="attention"
            className={styles['link']}
            onClick={() => navigate(admin)}
            children={
              <>
                <AdminLogo />
                <Typhography tag="span" variant="thirdy" children="Панель администратора" />
              </>
            }
          />
        )}
      </div>
      <Theme />
    </article>
  );
};
