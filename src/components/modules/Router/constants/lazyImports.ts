import { lazy } from 'react';

const Auth = lazy(() => import('@/components/Pages/Auth/Auth').then((module) => ({ default: module.Auth })));

const JournalMobile = lazy(() =>
  import('@/components/Pages/Journal/Mobile/JournalMobile').then((module) => ({ default: module.JournalMobile }))
);

const JournalDesktop = lazy(() =>
  import('@/components/Pages/Journal/Desktop/JournalDesktop').then((module) => ({
    default: module.JournalDesktop
  }))
);

const LessonModal = lazy(() =>
  import('@/components/Pages/Journal/modules/LessonModal/LessonModal').then((module) => ({
    default: module.LessonModal
  }))
);

const AdminPanel = lazy(() =>
  import('@/components/Pages/AdminPanel/AdminPanel').then((module) => ({ default: module.AdminPanel }))
);

const ModerPanel = lazy(() =>
  import('@/components/Pages/ModerPanel/ModerPanel').then((module) => ({ default: module.ModerPanel }))
);

const DayHomeworkMobile = lazy(() =>
  import('@/components/Pages/DayHomework/Mobile/DayHomeworkMobile').then((module) => ({
    default: module.DayHomeworkMobile
  }))
);

const DayHomeworkDesktop = lazy(() =>
  import('@/components/Pages/DayHomework/Desktop/DayHomeworkDesktop').then((module) => ({
    default: module.DayHomeworkDesktop
  }))
);

const SubjectsNote = lazy(() =>
  import('@/components/Pages/SubjectsNote/SubjectsNote').then((module) => ({ default: module.SubjectsNote }))
);

const Profile = lazy(() =>
  import('@/components/Pages/Profile/Profile').then((module) => ({ default: module.ProfileSettings }))
);

export {
  Auth,
  JournalMobile,
  JournalDesktop,
  LessonModal,
  AdminPanel,
  ModerPanel,
  DayHomeworkMobile,
  DayHomeworkDesktop,
  SubjectsNote,
  Profile
};
