import { PAGES } from '../constants/pages';

const journalRoutes = [PAGES.JOURNAL_DESKTOP, PAGES.JOURNAL_MOBILE];
const addHomeworkRoutes = [PAGES.ADD_HOMEWORK_DESKTOP, PAGES.ADD_HOMEWORK_MOBILE];

const isMobile = Number(window.matchMedia('screen and (max-width: 1050px)').matches);

const JournalChooseMedia = journalRoutes[isMobile];
const AddHomeworkChooseMedia = addHomeworkRoutes[isMobile];

export { JournalChooseMedia, AddHomeworkChooseMedia };
