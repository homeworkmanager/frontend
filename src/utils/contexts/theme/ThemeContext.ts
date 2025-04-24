import React from 'react';

import { INITIAL_THEME } from '@/utils/configs/initialTheme.config';

interface ThemeContextParams {
  theme: Theme;
  toggleTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextParams>({
  theme: INITIAL_THEME,
  toggleTheme: () => {}
});

export { ThemeContext, type ThemeContextParams };
