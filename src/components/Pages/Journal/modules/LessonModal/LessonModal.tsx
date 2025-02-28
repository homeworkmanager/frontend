import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { LessonCard } from './LessonCard/LessonCard';
import { Modal } from '@/components/ui/Modal';
import { JournalChooseMedia } from '@/utils/helpers/ChooseMedia';
import { formatText } from '@/utils/helpers/formatText';

export const LessonModal = () => {
  const [showInfo, setShowInfo] = React.useState(true);
  const location = useLocation();
  const { apiData, Homeworks } = location.state;

  const [homeworks, setHomeworks] = React.useState<RestructHomeworkArray>(Homeworks);

  const navigate = useNavigate();

  const journalType = JournalChooseMedia;

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
        navigate(`${journalType}`, { replace: true });
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
