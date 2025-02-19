import { JournalChooseMedia } from "@/utils/helpers/ChooseMedia";
import { useLocation, Navigate } from "react-router-dom";


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