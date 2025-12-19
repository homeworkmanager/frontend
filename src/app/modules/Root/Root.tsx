import { Suspense } from 'react';

import { Layout } from '../Layout';
import { NavigationInitializer } from '../Navigator';
import { SeasonOverlay } from '../SeasonOverlay';

export const Root = () => (
  <>
    <Layout />
    <NavigationInitializer />
    <Suspense>
      <SeasonOverlay />
    </Suspense>
    {/* <NetworkWatcher /> */}
  </>
);
