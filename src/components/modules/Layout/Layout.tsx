import { Outlet, useMatch } from 'react-router-dom';

import { NavigationInitializer } from '../Router/Navigator';

import styles from './Layout.module.css';
import { Header } from '@/components/modules/Header/Header';

export const Layout = () => {
  const showHeader = !useMatch({ path: '/auth' });

  return (
    <main className={styles.layout}>
      {showHeader && <Header />}
      <Outlet />
      <NavigationInitializer />
    </main>
  );
};
