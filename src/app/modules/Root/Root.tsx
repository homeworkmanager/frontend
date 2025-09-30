import { Layout } from '../Layout/Layout';
import { NavigationInitializer } from '../Navigator';
// import { NetworkWatcher } from '../NetworkWatcher';

export const Root = () => (
  <>
    <Layout />
    <NavigationInitializer />
    {/* <NetworkWatcher /> */}
  </>
);
