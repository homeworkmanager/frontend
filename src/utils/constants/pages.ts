const BASE = '/';

export const PAGES = {
  ERROR: '*',
  MAIN: BASE,
  AUTH: BASE + 'auth',
  JOURNAL_MOBILE: BASE + 'journal-mobile',
  JOURNAL_DESKTOP: BASE + 'journal-desktop',
  LESSON_MODAL: 'lesson',
  ADD_HOMEWORK_MOBILE: BASE + 'add/homework-mobile',
  ADD_HOMEWORK_DESKTOP: BASE + 'add/homework-desktop',
  AGGREGATE_HOMEWORK: BASE + 'aggregate/homework',
  NOTE: BASE + 'note',
  FEATURES: BASE + 'features',
  ADMIN: BASE + 'admin',
  MODER: BASE + 'moderator'
} as const;
