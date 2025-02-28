import { Navigate } from 'react-router-dom';

import { auth } from '../constants/routes';

interface LocationGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: LocationGuardProps) => {
  const isAuth = !!document.cookie.match('session_key=') && !!document.cookie.match('session_expires=');

  if (!isAuth) {
    return <Navigate to={auth} />;
  }

  return <>{children}</>;
};
