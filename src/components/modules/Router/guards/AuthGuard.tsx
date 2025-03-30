import { Navigate } from 'react-router-dom';

import { auth } from '../../../../utils/configs/routes.config';

import { cookieExpires, cookieKey } from '@/utils/configs/cookieNames.config';

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
