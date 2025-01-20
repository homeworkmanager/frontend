import { lazy } from 'react';

const Auth = lazy(() => import('@/components/Pages/Auth/Auth').then((module) => ({ default: module.Auth })));

const JournalMobile = lazy(() =>
  import('@/components/Pages/Journal/JournalMobile/JournalMobile').then((module) => ({ default: module.JournalMobile }))
);

const JournalDesktop = lazy(() =>
  import('@/components/Pages/Journal/JournalDesktop/JournalDesktop').then((module) => ({
    default: module.JournalDesktop
  }))
);

const DayHomeworkMobile = lazy(() =>
  import('@/components/Pages/DayHomework/DayHomeworkMobile/DayHomeworkMobile').then((module) => ({
    default: module.DayHomeworkMobile
  }))
);

const DayHomeworkDesktop = lazy(() =>
  import('@/components/Pages/DayHomework/DayHomeworkDesktop/DayHomeworkDesktop').then((module) => ({
    default: module.DayHomeworkDesktop
  }))
);

const AdminPanel = lazy(() =>
  import('@/components/Pages/AdminPanel/AdminPanel').then((module) => ({ default: module.AdminPanel }))
);

const ProfileSettings = lazy(() =>
  import('@/components/Pages/ProfileSettings/ProfileSettings').then((module) => ({ default: module.ProfileSettings }))
);

export { Auth, JournalMobile, JournalDesktop, DayHomeworkMobile, DayHomeworkDesktop, AdminPanel, ProfileSettings };
