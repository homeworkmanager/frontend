import { Outlet, useMatch } from 'react-router-dom';

import styles from './Layout.module.css';
import { Header } from '@/components/shared/Header/Header';

export const Layout = () => {
  const showHeader = !useMatch('/auth');
  return (
    <main className={styles.layout}>
      {showHeader && <Header />}
      <Outlet />
    </main>
  );
};
