import React from 'react';

import { Router } from './modules/Router';
import { getUserRefresh } from '@/utils/api/requests/user/refresh';
import { COOKIE_KEY } from '@/utils/constants/cookie';
import { MAX_TIME_TO_COOKIE_REFRESH } from '@/utils/constants/time';
import { checkUserData } from '@/utils/services/checkUserData';
import { logIn } from '@/utils/store/slices/user/slice';
import { useAppDispatch } from '@/utils/store/store';

function App() {
  const dispatch = useAppDispatch();

  const refreshCookie = async () => {
    try {
      await getUserRefresh();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const setUserData = async () => {
    try {
      const { data } = await checkUserData();
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
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const getTimeUpdateSession = (cookie: string) => {
    const expiresDate = new Date(document.cookie.match(cookie)?.input?.split('=')[2].split('+')[0] as string);
    return expiresDate.getTime() - new Date().getTime();
  };

  React.useEffect(() => {
    if (!document.cookie.match(COOKIE_KEY)) return;
    setUserData();

    if (getTimeUpdateSession(COOKIE_KEY) < MAX_TIME_TO_COOKIE_REFRESH) {
      refreshCookie();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return <Router />;
}

export default App;
