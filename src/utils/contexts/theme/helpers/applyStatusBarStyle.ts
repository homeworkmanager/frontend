export const applyStatusBarStyle = (theme: Theme) => {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="apple-mobile-web-app-status-bar-style"]');
  if (!meta) return;
  if (theme === 'light') {
    meta.content = 'default';
    return;
  }
  meta.content = 'black';
};
