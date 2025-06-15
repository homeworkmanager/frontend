import React from 'react';

import { ThemeContext } from './ThemeContext';
import { INITIAL_THEME } from '@/utils/constants/initialTheme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = React.useState<Theme>(INITIAL_THEME);
  const initRef = React.useRef(false);

  const toggleTheme = (newTheme: Theme) => setTheme(newTheme);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    if (initRef.current) {
      localStorage.setItem('theme', theme);
      return;
    }

    initRef.current = true;
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
