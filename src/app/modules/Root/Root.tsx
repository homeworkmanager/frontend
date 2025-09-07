import { Layout } from '../Layout/Layout';
import { NavigationInitializer } from '../Navigator/Navigator';

import { ThemeProvider } from '@/utils/contexts/theme/ThemeProvider';

export const Root = () => (
  <ThemeProvider>
    <Layout />
    <NavigationInitializer />
  </ThemeProvider>
);
