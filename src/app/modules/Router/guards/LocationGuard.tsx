import { Navigate, useLocation } from 'react-router-dom';

import { JournalChooseMedia } from '@/utils/services/chooseMedia';

interface LocationGuardProps {
  children: React.ReactNode;
}

export const LocationGuard = ({ children }: LocationGuardProps) => {
  const location = useLocation();
  const journalType = JournalChooseMedia;

  if (location.state === null) {
    return <Navigate to={journalType} />;
  }

  return <>{children}</>;
};
