import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Profile } from './components/Profile';
import { Themes } from './components/Themes';
import styles from './Features.module.css';
import { routerNavigator } from '@/app/modules/Navigator';
import { AdminLogo } from '@/shared/Icons/Admin';
import { ModerLogo } from '@/shared/Icons/Moder';
import { ThemeLogo } from '@/shared/Icons/Theme';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { Typhography } from '@/shared/ui/Typhography';
import { PAGES } from '@/utils/constants/pages';
import { USER_ROLES } from '@/utils/constants/userRoles';
import { getUserRole } from '@/utils/store/slices/user/selectors';

type ModuleVariants = 'profile' | 'theme' | 'none';

export default function ProfileSettings() {
  const role = useSelector(getUserRole);
  const [moduleShow, setModuleShow] = React.useState<ModuleVariants>('none');

  const onShowTheme = () => setModuleShow('none');

  return (
    <article className={styles.container}>
      <Profile />
      <div className={styles['content']}>
        <Typhography tag="p" variant="thirdy" className={styles['settings']} children="" />
        {role === USER_ROLES.MODERATOR && (
          <Link to={PAGES.MODER}>
            <Button
              variant="attention"
              className={styles['link']}
              onClick={() => routerNavigator.to(PAGES.MODER)}
              children={
                <>
                  <ModerLogo className={styles['moder']} />
                  <Typhography tag="span" variant="thirdy" children="Панель модератора" />
                </>
              }
            />
          </Link>
        )}

        {role === USER_ROLES.ADMIN && (
          <Button
            variant="attention"
            className={styles['link']}
            onClick={() => routerNavigator.to(PAGES.ADMIN)}
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
        <Themes onClose={onShowTheme} />
      </Modal>
    </article>
  );
}
