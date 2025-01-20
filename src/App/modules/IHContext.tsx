import React, { ReactNode } from 'react';

type IHType = {
  independentHomeworks: RestructHomeworkArray[];
  init: (initArray: RestructHomeworkArray[]) => void;
  addIndependentHomework: (element: RestructHomeworkElement, index: number) => void;
  removeIndependentHomework: (element: RestructHomeworkElement, index: number) => void;
  changeIndependentHomework: (element: RestructHomeworkElement, index: number) => void;
};

export const IHContext = React.createContext<IHType>({
  independentHomeworks: [[]],
  init: () => {},
  addIndependentHomework: () => {},
  removeIndependentHomework: () => {},
  changeIndependentHomework: () => {}
});

export const IHProvider = ({ children }: { children: ReactNode }) => {
  const [independentHomeworks, setIndependentHomeworks] = React.useState<RestructHomeworkArray[]>([]);

  const initValues = (initArray: RestructHomeworkArray[]) => {
    if (independentHomeworks.length !== 0) return;
    setIndependentHomeworks(initArray);
  };

  const addIndependentHomework = (element: RestructHomeworkElement, index: number) => {
    setIndependentHomeworks((prev) => [...prev.slice(0, index), [...prev[index], element], ...prev.slice(index + 1)]);
  };

  const removeIndependentHomework = (element: RestructHomeworkElement, index: number) => {
    setIndependentHomeworks((prev) => [
      ...prev.slice(0, index),
      prev[index].filter(
        (homework) => homework.homeworkID !== element.homeworkID && homework.homeworkText !== element.homeworkText
      ),
      ...prev.slice(index + 1)
    ]);
  };

  const changeIndependentHomework = (element: RestructHomeworkElement, index: number) => {
    setIndependentHomeworks((prev) => [
      ...prev.slice(0, index),
      prev[index].map((homework) => {
        if (homework.homeworkID === element.homeworkID) {
          return {
            ...homework,
            homeworkText: element.homeworkText
          };
        }
        return homework;
      }),
      ...prev.slice(index + 1)
    ]);
  };

  return (
    <IHContext.Provider
      value={{
        independentHomeworks,
        init: initValues,
        addIndependentHomework,
        removeIndependentHomework,
        changeIndependentHomework
      }}
    >
      {children}
    </IHContext.Provider>
  );
};
