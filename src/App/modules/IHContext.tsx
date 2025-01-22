import React, { ReactNode } from 'react';

type IHType = {
  independentHomeworks: RestructHomeworkArray[];
  initIH: (initArray: RestructHomeworkArray[]) => void;
  addIndependentHomework: (element: RestructHomeworkElement, index: number) => void;
  removeIndependentHomework: (element: RestructHomeworkElement, index: number) => void;
  changeIndependentHomework: (element: RestructHomeworkElement, index: number) => void;
  changeIndependentHomeworkStatus: (element: RestructHomeworkElement, index: number) => void;
};

export const IHContext = React.createContext<IHType>({
  independentHomeworks: [],
  initIH: () => {},
  addIndependentHomework: () => {},
  removeIndependentHomework: () => {},
  changeIndependentHomework: () => {},
  changeIndependentHomeworkStatus: () => {}
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
        (homework) => homework.homeworkID !== element.homeworkID || homework.homeworkText !== element.homeworkText
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
            homeworkText: element.homeworkText,
            isCompleted: false
          };
        }
        return homework;
      }),
      ...prev.slice(index + 1)
    ]);
  };

  const changeIndependentHomeworkStatus = (element: RestructHomeworkElement, index: number) => {
    setIndependentHomeworks((prev) => [
      ...prev.slice(0, index),
      prev[index].map((homework) => {
        if (homework.homeworkID === element.homeworkID) {
          return {
            ...homework,
            isCompleted: !element.isCompleted
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
        initIH: initValues,
        addIndependentHomework,
        removeIndependentHomework,
        changeIndependentHomework,
        changeIndependentHomeworkStatus
      }}
    >
      {children}
    </IHContext.Provider>
  );
};
