import React from 'react';
import { useOutletContext } from 'react-router-dom';

import { LessonCard } from './LessonCard';
import { routerNavigator } from '@/app/modules/Navigator';
import { Modal } from '@/shared/ui/Modal';
import { JournalChooseMedia } from '@/utils/services/chooseMedia';
import { SwiperRef } from 'swiper/react';

type OutletContext = {
  dayCarouselRef: React.RefObject<SwiperRef>;
};

export default function LessonModal() {
  const { dayCarouselRef } = useOutletContext<OutletContext>();
  const [showInfo, setShowInfo] = React.useState(true);
  const showDetails = () => setShowInfo((prev) => !prev);

  React.useEffect(() => {
    if (!showInfo) {
      if (dayCarouselRef && dayCarouselRef.current) dayCarouselRef.current.swiper.wrapperEl.style.height = 'auto';

      const timer = setTimeout(() => {
        routerNavigator.to(JournalChooseMedia, { state: null, replace: true });
      }, 150);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [dayCarouselRef, showInfo]);

  return (
    <Modal showInfo={showInfo} showDetails={showDetails}>
      <LessonCard showDetails={showDetails} />
    </Modal>
  );
}
