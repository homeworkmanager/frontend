import React from 'react';

import { Router } from '@/components/modules/Router/Router';
import { getUserData } from '@/utils/api/requests/user/get';
import { getUserRefresh } from '@/utils/api/requests/user/refresh';
import { cookieExpires, cookieKey } from '@/utils/configs/cookieNames.config';
import { maxTimeToRefresh } from '@/utils/configs/maxTimeToRefresh.config';
import { useAppDispatch } from '@/utils/redux/store';
import { logIn } from '@/utils/redux/storeSlices/userSlice/slice';

function App() {
  const dispatch = useAppDispatch();
  const refreshCookies = async () => {
    try {
      await getUserRefresh();
    } catch (error) {
      // eslint-disable-next-line no-console
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
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const getTimeUpdateSession = (cookie: string) => {
    const expiresDate = new Date(document.cookie.match(cookie)?.input?.split('=')[2].split('+')[0] as string);
    return expiresDate.getTime() - new Date().getTime();
  };

  React.useEffect(() => {
    if (!(document.cookie.match(cookieExpires) && document.cookie.match(cookieKey))) return;
    setUserData();

    if (getTimeUpdateSession(cookieKey) < maxTimeToRefresh) {
      refreshCookies();
    }
  }, [dispatch]);

  return <Router />;
}

export default App;
