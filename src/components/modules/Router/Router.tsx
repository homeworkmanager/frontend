import { Suspense } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';

import { Root } from '../Root/Root';

import {
  AdminPanel,
  Auth,
  DayHomeworkDesktop,
  DayHomeworkMobile,
  Features,
  HomeworkAggregated,
  JournalDesktop,
  JournalMobile,
  LessonModal,
  ModerPanel,
  SubjectsNote
} from './constants/lazyImports';
import { AuthGuard } from './guards/AuthGuard';
import { LocationGuard } from './guards/LocationGuard';
import { AuthLoading } from '@/components/pages/Auth/AuthLoading';
import { HomeworkAggregatedLoading } from '@/components/pages/HomeworkAggregated/HomeworkAggregatedLoading';
import { JournalDesktopLoading } from '@/components/pages/Journal/Desktop/JournalDesktopLoading';
import { JournalMobileLoading } from '@/components/pages/Journal/Mobile/JournalMobileLoading';
import { SubjectNotesLoading } from '@/components/pages/SubjectsNote/SubjectsNoteLoading';
import { Loader } from '@/components/ui/Loader';
import {
  ADD_HOMEWORK_DESKTOP,
  ADD_HOMEWORK_MOBILE,
  ADMIN,
  AGGREGATE_HOMEWORK,
  AUTH,
  ERROR,
  FEATURES,
  JOURNAL_DESKTOP,
  JOURNAL_MOBILE,
  LESSON_MODAL,
  MAIN,
  MODER,
  NOTE
} from '@/utils/constants/routes';
import { ADMIN_ROLE, MODERATOR_ROLE } from '@/utils/constants/userRoles';
import { getUserRole } from '@/utils/redux/storeSlices/user/selectors';
import { JournalChooseMedia } from '@/utils/services/chooseMedia';

export const Router = () => {
  const userRole = useSelector(getUserRole);

  const journalType = JournalChooseMedia;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Root />}>
        <Route
          path={MAIN}
          element={
            <AuthGuard>
              <Navigate to={journalType} />
            </AuthGuard>
          }
        />
        <Route path={ERROR} element={<Navigate to="/" replace />} />

        <Route
          path={AUTH}
          element={
            <Suspense fallback={<AuthLoading />}>
              <Auth />
            </Suspense>
          }
        />
        <Route
          path={JOURNAL_MOBILE}
          element={
            <Suspense fallback={<JournalMobileLoading />}>
              <AuthGuard>
                {journalType === JOURNAL_MOBILE ? <JournalMobile /> : <Navigate to={JOURNAL_DESKTOP} />}
              </AuthGuard>
            </Suspense>
          }
        >
          <Route
            path={LESSON_MODAL}
            element={
              <Suspense>
                <LocationGuard>
                  <LessonModal />
                </LocationGuard>
              </Suspense>
            }
          />
        </Route>

        <Route
          path={JOURNAL_DESKTOP}
          element={
            <Suspense fallback={<JournalDesktopLoading />}>
              <AuthGuard>
                {journalType === JOURNAL_DESKTOP ? <JournalDesktop /> : <Navigate to={JOURNAL_MOBILE} />}
              </AuthGuard>
            </Suspense>
          }
        >
          <Route
            path={LESSON_MODAL}
            element={
              <Suspense>
                <LocationGuard>
                  <LessonModal />
                </LocationGuard>
              </Suspense>
            }
          />
        </Route>

        <Route
          path={ADMIN}
          element={
            <Suspense fallback={<Loader />}>
              <AuthGuard>{userRole === ADMIN_ROLE ? <AdminPanel /> : <Navigate to={journalType} />}</AuthGuard>
            </Suspense>
          }
        />

        <Route
          path={MODER}
          element={
            <Suspense fallback={<Loader />}>
              <AuthGuard>{userRole === MODERATOR_ROLE ? <ModerPanel /> : <Navigate to={journalType} />}</AuthGuard>
            </Suspense>
          }
        />

        <Route
          path={ADD_HOMEWORK_MOBILE}
          element={
            <Suspense fallback={<Loader />}>
              <AuthGuard>
                {userRole >= MODERATOR_ROLE ? <DayHomeworkMobile /> : <Navigate to={JOURNAL_MOBILE} />}
              </AuthGuard>
            </Suspense>
          }
        />

        <Route
          path={ADD_HOMEWORK_DESKTOP}
          element={
            <Suspense fallback={<Loader />}>
              <AuthGuard>
                {userRole >= MODERATOR_ROLE ? <DayHomeworkDesktop /> : <Navigate to={JOURNAL_DESKTOP} />}
              </AuthGuard>
            </Suspense>
          }
        />

        <Route
          path={AGGREGATE_HOMEWORK}
          element={
            <Suspense fallback={<HomeworkAggregatedLoading />}>
              <AuthGuard>
                <HomeworkAggregated />
              </AuthGuard>
            </Suspense>
          }
        />

        <Route
          path={NOTE}
          element={
            <Suspense fallback={<SubjectNotesLoading />}>
              <AuthGuard>
                <SubjectsNote />
              </AuthGuard>
            </Suspense>
          }
        />

        <Route
          path={FEATURES}
          element={
            <Suspense>
              <AuthGuard>
                <Features />
              </AuthGuard>
            </Suspense>
          }
        />
      </Route>
    )
  );

  React.useEffect(() => {}, []);

  return <RouterProvider router={router} />;
};
