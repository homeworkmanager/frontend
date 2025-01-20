import React from 'react';
import { useDispatch } from 'react-redux';

import { EntryContext } from './modules/AuthContext';
import { Router } from '@/components/modules/Router/Router';
import { getUserData } from '@/utils/api/requests/user/get';
import { getUserRefresh } from '@/utils/api/requests/user/refresh';
import { logIn } from '@/utils/redux/storeSlices/userSlice/slice';

function App() {
  const dispatch = useDispatch();
  const { isEntry } = React.useContext(EntryContext);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
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
          role: 3, //data.role
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
    const currentDate = new Date();
    expiresDate.setHours(expiresDate.getHours() + 3);
    return expiresDate.getTime() - currentDate.getTime();
  };

  const userSessionRefresh = async () => {
    try {
      const timeToRefresh = getTimeUpdateSession('session_expires=') - 40 * 1000;

      if (timeToRefresh > 0) {
        timeoutRef.current = setTimeout(() => {
          (async () => {
            await refreshCookies();
            await userSessionRefresh();
          })();
        }, timeToRefresh);
        return;
      }
      await userSessionRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (isEntry) {
      userSessionRefresh();
    }

    if (!isEntry && document.cookie.match('session_key=')) {
      refreshCookies();
      setUserData();
      userSessionRefresh();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isEntry]);

  return <Router />;
}

export default App;
