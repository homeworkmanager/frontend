import { Navigate } from 'react-router-dom';

import { COOKIE_KEY } from '@/utils/constants/cookie';
import { PAGES } from '@/utils/constants/pages';

interface LocationGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: LocationGuardProps) => {
  const isAuth = !!document.cookie.match(COOKIE_KEY);

  if (!isAuth) {
    return <Navigate to={PAGES.AUTH} />;
  }

  return <>{children}</>;
};
