import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './styles/index.ts';

import App from './App';
import { EntryProvider } from './App/modules/AuthContext.tsx';
import { store } from './utils/redux/store.ts';
import { registerSW } from 'virtual:pwa-register';

registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <EntryProvider>
      <App />
    </EntryProvider>
  </Provider>
);
