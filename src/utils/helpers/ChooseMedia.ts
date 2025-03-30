import { addHomeworkDesktop, addHomeworkMobile, journalDesktop, journalMobile } from '@/utils/configs/routes.config';

const journalRoutes = [journalDesktop, journalMobile];
const addHomeworkRoutes = [addHomeworkDesktop, addHomeworkMobile];
const isMobile = Number(window.matchMedia('screen and (max-width: 1050px)').matches);

const JournalChooseMedia = journalRoutes[isMobile];
const AddHomeworkChooseMedia = addHomeworkRoutes[isMobile];

export { JournalChooseMedia, AddHomeworkChooseMedia, isMobile };
