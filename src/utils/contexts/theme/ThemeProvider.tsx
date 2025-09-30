import { useLayoutEffect, useRef, useState } from 'react';

import { applyStatusBarStyle } from './helpers/applyStatusBarStyle';
import { ThemeContext } from './ThemeContext';
import { INITIAL_THEME } from '@/utils/constants/initialTheme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(INITIAL_THEME);
  const initRef = useRef(false);

  const toggleTheme = (newTheme: Theme) => setTheme(newTheme);

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    applyStatusBarStyle(theme);

    if (initRef.current) {
      localStorage.setItem('theme', theme);
      return;
    }

    initRef.current = true;
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
