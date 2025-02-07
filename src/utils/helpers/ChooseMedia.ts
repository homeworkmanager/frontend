const journalRoutes = ['/journal-desktop', '/journal-mobile'];
const moderatorRoutes = ['/moderator-desktop', '/moderator-mobile'];
const isMobile = Number(window.matchMedia('screen and (max-width: 1050px)').matches);

const JournalChooseMedia = journalRoutes[isMobile];
const ModeratorChooseMedia = moderatorRoutes[isMobile];

export { JournalChooseMedia, ModeratorChooseMedia };
