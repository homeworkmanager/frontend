import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './styles/index.ts';

import App from './app';
import { store } from './utils/store/store.ts';
import { registerSW } from 'virtual:pwa-register';

registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
