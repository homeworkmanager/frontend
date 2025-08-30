import { lazy } from 'react';

const Auth = lazy(() => import('@/components/pages/Auth/Auth').then((module) => ({ default: module.Auth })));

const JournalMobile = lazy(() =>
  import('@/components/pages/Journal/Mobile/JournalMobile').then((module) => ({ default: module.JournalMobile }))
);

const JournalDesktop = lazy(() =>
  import('@/components/pages/Journal/Desktop/JournalDesktop').then((module) => ({
    default: module.JournalDesktop
  }))
);

const AdminPanel = lazy(() =>
  import('@/components/pages/AdminPanel/AdminPanel').then((module) => ({ default: module.AdminPanel }))
);

const ModerPanel = lazy(() =>
  import('@/components/pages/ModerPanel/ModerPanel').then((module) => ({ default: module.ModerPanel }))
);

const DayHomeworkMobile = lazy(() =>
  import('@/components/pages/DayHomework/Mobile/DayHomeworkMobile').then((module) => ({
    default: module.DayHomeworkMobile
  }))
);

const DayHomeworkDesktop = lazy(() =>
  import('@/components/pages/DayHomework/Desktop/DayHomeworkDesktop').then((module) => ({
    default: module.DayHomeworkDesktop
  }))
);

const HomeworkAggregated = lazy(() =>
  import('@/components/pages/HomeworkAggregated/HomeworkAggregated').then((module) => ({
    default: module.HomeworkAggregated
  }))
);

const SubjectsNote = lazy(() =>
  import('@/components/pages/SubjectsNote/SubjectsNote').then((module) => ({ default: module.SubjectsNote }))
);

const Features = lazy(() =>
  import('@/components/pages/Features/Features').then((module) => ({ default: module.ProfileSettings }))
);

export {
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
