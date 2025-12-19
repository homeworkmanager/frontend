import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './styles/index.ts';

import App from './app';
import { ThemeProvider } from './utils/contexts/theme/ThemeProvider.tsx';
import { store } from './utils/store/store.ts';
import { registerSW } from 'virtual:pwa-register';

registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);
