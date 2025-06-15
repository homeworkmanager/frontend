import React from 'react';

import { LessonCard } from './LessonCard/LessonCard';
import { routerNavigator } from '@/components/modules/Router/Navigator';
import { Modal } from '@/components/ui/Modal';
import { JournalChooseMedia } from '@/utils/helpers/ChooseMedia';

export const LessonModal = () => {
  const [showInfo, setShowInfo] = React.useState(true);
  const showDetails = () => setShowInfo((prev) => !prev);

  React.useEffect(() => {
    if (!showInfo) {
      const timer = setTimeout(() => {
        routerNavigator.to(JournalChooseMedia, { replace: true, state: null });
      }, 150);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showInfo]);

  return (
    <Modal showInfo={showInfo} showDetails={showDetails}>
      <LessonCard showDetails={showDetails} />
    </Modal>
  );
};
