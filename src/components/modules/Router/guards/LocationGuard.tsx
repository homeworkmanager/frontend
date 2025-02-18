import { useLocation, Navigate } from "react-router-dom";


interface LocationGuardProps {
  children: React.ReactNode;
}

export const LocationGuard = ({ children }: LocationGuardProps) => {
  const location = useLocation();

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};