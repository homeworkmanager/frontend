import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './Features.module.css';
import { Profile } from './modules/Profile/Profile';
import { Theme } from './modules/Theme/Theme';
import { routerNavigator } from '@/components/modules/Router/Navigator';
import { Button } from '@/components/ui/Button';
import { AdminLogo } from '@/components/ui/Icons/Admin';
import { ModerLogo } from '@/components/ui/Icons/Moder';
import { ThemeLogo } from '@/components/ui/Icons/Theme';
import { Modal } from '@/components/ui/Modal';
import { Typhography } from '@/components/ui/Typhography';
import { ADMIN, MODER } from '@/utils/configs/routes.config';
import { ADMIN_ROLE, MODERATOR_ROLE } from '@/utils/configs/userRoles.config';
import { getUserRole } from '@/utils/redux/storeSlices/userSlice/selectors';

type ModuleVariants = 'profile' | 'theme' | 'none';

export const ProfileSettings = () => {
  const role = useSelector(getUserRole);
  const [moduleShow, setModuleShow] = React.useState<ModuleVariants>('none');

  const onShowTheme = () => setModuleShow((prev) => (prev === 'none' ? 'theme' : 'none'));

  return (
    <article className={styles.container}>
      <Profile />
      <div className={styles['content']}>
        <Typhography tag="p" variant="thirdy" className={styles['settings']} children="" />
        {role === MODERATOR_ROLE && (
          <Link to={MODER}>
            <Button
              variant="attention"
              className={styles['link']}
              onClick={() => routerNavigator.to(MODER, { replace: true })}
              children={
                <>
                  <ModerLogo className={styles['moder']} />
                  <Typhography tag="span" variant="thirdy" children="Панель модератора" />
                </>
              }
            />
          </Link>
        )}

        {role === ADMIN_ROLE && (
          <Button
            variant="attention"
            className={styles['link']}
            onClick={() => routerNavigator.to(ADMIN, { replace: true })}
            children={
              <>
                <AdminLogo />
                <Typhography tag="span" variant="thirdy" children="Панель администратора" />
              </>
            }
          />
        )}
        <Button
          variant="attention"
          className={styles['link']}
          onClick={() => setModuleShow('theme')}
          children={
            <>
              <ThemeLogo />
              <Typhography tag="span" variant="thirdy" children="Тема" />
            </>
          }
        />
      </div>
      <Modal showInfo={moduleShow === 'theme'} showDetails={onShowTheme}>
        <Theme onClose={onShowTheme} />
      </Modal>
    </article>
  );
};
