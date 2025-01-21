import React, { ReactNode } from 'react';

type HType = {
  homeworks: RestructHomeworkArray[][];
  initH: (initArray: RestructHomeworkArray[][]) => void;
  addHomework: (element: RestructHomeworkElement, dayIndex: number, lessonIndex: number) => void;
  removeHomework: (element: RestructHomeworkElement, dayIndex: number, lessonIndex: number) => void;
  changeHomework: (element: RestructHomeworkElement, dayIndex: number, lessonIndex: number) => void;
};

export const HContext = React.createContext<HType>({
  homeworks: [],
  initH: () => {},
  addHomework: () => {},
  removeHomework: () => {},
  changeHomework: () => {}
});

export const HProvider = ({ children }: { children: ReactNode }) => {
  const [homeworks, setHomeworks] = React.useState<RestructHomeworkArray[][]>([]);

  const initValues = (initArray: RestructHomeworkArray[][]) => {
    if (homeworks.length !== 0) return;
    setHomeworks(initArray);
  };

  const addHomework = (element: RestructHomeworkElement, dayIndex: number, lessonIndex: number) => {
    setHomeworks((prev) => [
      ...prev.slice(0, dayIndex),
      [
        ...prev[dayIndex].slice(0, lessonIndex),
        [...prev[dayIndex][lessonIndex], element],
        ...prev[dayIndex].slice(lessonIndex + 1)
      ],
      ...prev.slice(dayIndex + 1)
    ]);
  };

  const removeHomework = (element: RestructHomeworkElement, dayIndex: number, lessonIndex: number) => {
    setHomeworks((prev) => [
      ...prev.slice(0, dayIndex),
      [
        ...prev[dayIndex].slice(0, lessonIndex),
        prev[dayIndex][lessonIndex].filter(
          (homework) => homework.homeworkID !== element.homeworkID || homework.homeworkText !== element.homeworkText
        ),
        ...prev[dayIndex].slice(lessonIndex + 1)
      ],
      ...prev.slice(dayIndex + 1)
    ]);
  };

  const changeHomework = (element: RestructHomeworkElement, dayIndex: number, lessonIndex: number) => {
    setHomeworks((prev) => [
      ...prev.slice(0, dayIndex),
      [
        ...prev[dayIndex].slice(0, lessonIndex),
        prev[dayIndex][lessonIndex].map((homework) => {
          if (homework.homeworkID === element.homeworkID) {
            return {
              ...homework,
              homeworkText: element.homeworkText
            };
          }
          return homework;
        }),
        ...prev[dayIndex].slice(lessonIndex + 1)
      ],
      ...prev.slice(dayIndex + 1)
    ]);
  };

  return (
    <HContext.Provider
      value={{
        homeworks: homeworks,
        initH: initValues,
        addHomework,
        removeHomework,
        changeHomework
      }}
    >
      {children}
    </HContext.Provider>
  );
};
