export const INITIAL_THEME =
  (localStorage.getItem('theme') as Theme) ??
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
