import { Outlet } from 'react-router-dom';

import { IHProvider } from '@/App/modules/IHContext';

export const SpecialLayout = () => (
  <IHProvider>
    <Outlet />
  </IHProvider>
);
