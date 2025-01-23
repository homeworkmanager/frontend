import { Outlet } from 'react-router-dom';

import styles from './Layout.module.css';

export const Layout = () => (
  <main className={styles.layout}>
    <Outlet />
  </main>
);
