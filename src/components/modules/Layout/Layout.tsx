import { Outlet, useMatch } from 'react-router-dom';

import styles from './Layout.module.css';
import { Header } from '@/components/modules/Header/Header';
import clsx from 'clsx';

export const Layout = () => {
  const showHeader = !useMatch({ path: '/auth' });

  return (
    <main className={clsx(styles['layout'])}>
      <div className={styles['content']}>
        {showHeader && <Header />}
        <Outlet />
      </div>
    </main>
  );
};
