import React from 'react';

import { Router } from '@/components/modules/Router/Router';
import { getUserData } from '@/utils/api/requests/user/get';
import { getUserRefresh } from '@/utils/api/requests/user/refresh';
import { maxTimeToRefresh } from '@/utils/constants/maxTimeToRefresh';
import { useAppDispatch } from '@/utils/redux/store';
import { logIn } from '@/utils/redux/storeSlices/userSlice/slice';

function App() {
  const dispatch = useAppDispatch();
  const refreshCookies = async () => {
    try {
      await getUserRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  const setUserData = async () => {
    try {
      const { data } = await getUserData();
      dispatch(
        logIn({
          role: data.role,
          name: data.name,
          surname: data.surname,
          email: data.email,
          group_name: data.group_name
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getTimeUpdateSession = (cookie: string) => {
    const expiresDate = new Date(document.cookie.match(cookie)?.input?.split('=')[2].split('+')[0] as string);
    expiresDate.setHours(expiresDate.getHours() + 3); //поменять с гринвича на мск
    return expiresDate.getTime() - new Date().getTime();
  };

  React.useEffect(() => {
    if (!(document.cookie.match('session_key=') && document.cookie.match('session_expires='))) return;

    setUserData();

    if (getTimeUpdateSession('session_expires=') < maxTimeToRefresh) {
      refreshCookies();
    }
  }, [dispatch]);

  return <Router />;
}

export default App;
