import { Outlet } from 'react-router-dom';

import styles from './Layout.module.css';
import { HProvider } from '@/App/modules/HContext';
import { IHProvider } from '@/App/modules/IHContext';

export const Layout = () => (
  <main className={styles.layout}>
    <IHProvider>
      <HProvider>
        <Outlet />
      </HProvider>
    </IHProvider>
  </main>
);
