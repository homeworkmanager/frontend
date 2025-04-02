import React from 'react';
import { useLocation } from 'react-router-dom';

import { LessonCard } from './LessonCard/LessonCard';
import { routerNavigator } from '@/components/modules/Router/Navigator';
import { Modal } from '@/components/ui/Modal';
import { JournalChooseMedia } from '@/utils/helpers/chooseMedia';
import { formatText } from '@/utils/helpers/formatText';

export const LessonModal = () => {
  const [showInfo, setShowInfo] = React.useState(true);
  const location = useLocation();
  const { apiData, Homeworks } = location.state;

  const [homeworks, setHomeworks] = React.useState<RestructHomeworkArray>(Homeworks);

  const addLessonHomework = (homework: RestructHomeworkElement) => {
    setHomeworks((prev) => [...prev, { ...homework, homeworkText: formatText(homework.homeworkText) }]);
  };

  const deleteLessonHomework = (homework: RestructHomeworkElement) => {
    setHomeworks((prev) => prev.filter((item) => item.homeworkID !== homework.homeworkID));
  };

  const changeLessonHomework = (homework: RestructHomeworkElement) => {
    setHomeworks((prev) => [
      ...prev.map((item) => {
        if (item.homeworkID === homework.homeworkID) {
          return {
            ...item,
            homeworkText: formatText(homework.homeworkText),
            isCompleted: false
          };
        }
        return item;
      })
    ]);
  };

  const changeLessonHomeworkStatus = (homework: RestructHomeworkElement) => {
    setHomeworks((prev) => [
      ...prev.map((item) => {
        if (item.homeworkID === homework.homeworkID) {
          return {
            ...item,
            isCompleted: !homework.isCompleted
          };
        }
        return item;
      })
    ]);
  };

  const showDetails = () => setShowInfo((prev) => !prev);

  React.useEffect(() => {
    if (!showInfo) {
      const timer = setTimeout(() => {
        routerNavigator.to(JournalChooseMedia, { replace: true });
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [showInfo]);

  return (
    <Modal showInfo={showInfo} showDetails={showDetails}>
      <LessonCard
        apiData={apiData}
        homeworks={homeworks}
        showDetails={showDetails}
        addHomework={addLessonHomework}
        deleteHomework={deleteLessonHomework}
        changeHomework={changeLessonHomework}
        changeHomeworkStatus={changeLessonHomeworkStatus}
      />
    </Modal>
  );
};
