import { ADD_HOMEWORK_DESKTOP, ADD_HOMEWORK_MOBILE, JOURNAL_DESKTOP, JOURNAL_MOBILE } from '@/utils/constants/routes';

const journalRoutes = [JOURNAL_DESKTOP, JOURNAL_MOBILE];
const addHomeworkRoutes = [ADD_HOMEWORK_DESKTOP, ADD_HOMEWORK_MOBILE];

const isMobile = Number(window.matchMedia('screen and (max-width: 1050px)').matches);

const JournalChooseMedia = journalRoutes[isMobile];
const AddHomeworkChooseMedia = addHomeworkRoutes[isMobile];

export { JournalChooseMedia, AddHomeworkChooseMedia };
