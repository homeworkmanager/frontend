import { Outlet, useMatch } from 'react-router-dom';

import { Header } from '../Header';

import styles from './Layout.module.css';
import { ThemeProvider } from '@/utils/contexts/theme/ThemeProvider';
import clsx from 'clsx';

export const Layout = () => {
  const showHeader = !useMatch({ path: '/auth' });

  return (
    <ThemeProvider>
      <main className={clsx(styles['layout'])}>
        <div className={styles['content']}>
          {showHeader && <Header />}
          <Outlet />
        </div>
      </main>
    </ThemeProvider>
  );
};
