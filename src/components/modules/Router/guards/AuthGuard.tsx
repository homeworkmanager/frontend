import { Navigate } from 'react-router-dom';

import { auth } from '../constants/routes';

import { cookieExpires, cookieKey } from '@/utils/constants/cookieNames';

interface LocationGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: LocationGuardProps) => {
  const isAuth = !!document.cookie.match(cookieKey) && !!document.cookie.match(cookieExpires);

  if (!isAuth) {
    return <Navigate to={auth} />;
  }

  return <>{children}</>;
};
