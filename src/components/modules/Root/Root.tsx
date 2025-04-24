import { Layout } from '../Layout/Layout';
import { NavigationInitializer } from '../Router/Navigator';

import { ThemeProvider } from '@/utils/contexts/theme/ThemeProvider';

export const Root = () => (
  <ThemeProvider>
    <Layout />
    <NavigationInitializer />
  </ThemeProvider>
);
