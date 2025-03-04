export const deleteCookie = (name: string) => {
  const newCookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;

  const isLocal = window.location.hostname === 'localhost';

  if (isLocal) {
    document.cookie = newCookie;
    return;
  }

  document.cookie = newCookie + `; SameSite=Lax; domain=unihelper.ru;`;
};
