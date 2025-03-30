import { Navigate } from 'react-router-dom';

import { cookieKey } from '@/utils/configs/cookieNames.config';
import { auth } from '@/utils/configs/routes.config';

interface LocationGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: LocationGuardProps) => {
  const isAuth = !!document.cookie.match(cookieKey);

  if (!isAuth) {
    return <Navigate to={auth} />;
  }

  return <>{children}</>;
};
