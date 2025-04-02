import { Navigate } from 'react-router-dom';

import { COOKIE_KEY } from '@/utils/configs/cookie.config';
import { AUTH } from '@/utils/configs/routes.config';

interface LocationGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: LocationGuardProps) => {
  const isAuth = !!document.cookie.match(COOKIE_KEY);

  if (!isAuth) {
    return <Navigate to={AUTH} />;
  }

  return <>{children}</>;
};
