import React, { ReactNode } from 'react';

type EntryContextType = {
  isEntry: boolean;
  setIsEntry: () => void;
};

export const EntryContext = React.createContext<EntryContextType>({
  isEntry: false,
  setIsEntry: () => {}
});

export const EntryProvider = ({ children }: { children: ReactNode }) => {
  const [isEntry, setIsEntry] = React.useState(false);
  const changeAuth = () => setIsEntry((prev) => !prev);

  return <EntryContext.Provider value={{ isEntry, setIsEntry: changeAuth }}>{children}</EntryContext.Provider>;
};
