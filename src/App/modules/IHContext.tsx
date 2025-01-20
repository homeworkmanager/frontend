import React, { ReactNode } from 'react';

type IHType = {
  independentHomeworks: RestructHomeworkArray[];
  setIndependentHomeworks: (element: RestructHomeworkElement, index: number) => void;
  init: (initArray: RestructHomeworkArray[]) => void;
};

export const IHContext = React.createContext<IHType>({
  independentHomeworks: [[]],
  setIndependentHomeworks: () => {},
  init: () => {}
});

export const IHProvider = ({ children }: { children: ReactNode }) => {
  const [independentHomeworks, setIndependentHomeworks] = React.useState<RestructHomeworkArray[]>([]);
  const changeHomeworks = (element: RestructHomeworkElement, index: number) => {
    setIndependentHomeworks((prev) => [...prev.slice(0, index), [...prev[index], element], ...prev.slice(index + 1)]);
  };

  const initValues = (initArray: RestructHomeworkArray[]) => {
    if (independentHomeworks.length !== 0) return;
    setIndependentHomeworks(initArray);
  };

  return (
    <IHContext.Provider value={{ independentHomeworks, setIndependentHomeworks: changeHomeworks, init: initValues }}>
      {children}
    </IHContext.Provider>
  );
};
