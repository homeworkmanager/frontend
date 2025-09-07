import { lazy } from 'react';

const Auth = lazy(() => import('@/pages/auth').then((module) => module));

const JournalMobile = lazy(() => import('@/pages/journal/Mobile').then((module) => module));

const JournalDesktop = lazy(() => import('@/pages/journal/Desktop').then((module) => module));

const AdminPanel = lazy(() => import('@/pages/admin').then((module) => module));

const ModerPanel = lazy(() => import('@/pages/moderator').then((module) => module));

const DayHomeworkMobile = lazy(() => import('@/pages/addHomework/Mobile').then((module) => module));

const DayHomeworkDesktop = lazy(() => import('@/pages/addHomework/Desktop').then((module) => module));

const HomeworkAggregated = lazy(() => import('@/pages/aggregateHomework').then((module) => module));

const SubjectsNote = lazy(() => import('@/pages/note').then((module) => module));

const Features = lazy(() => import('@/pages/features').then((module) => module));

export const LazyPages = {
  Auth,
  JournalMobile,
  JournalDesktop,
  AdminPanel,
  ModerPanel,
  DayHomeworkMobile,
  DayHomeworkDesktop,
  HomeworkAggregated,
  SubjectsNote,
  Features
};
