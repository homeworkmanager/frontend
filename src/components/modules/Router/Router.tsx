import { Suspense } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';

import { Layout } from '../Layout/Layout';

import {
  AdminPanel,
  Auth,
  DayHomeworkDesktop,
  DayHomeworkMobile,
  Features,
  JournalDesktop,
  JournalMobile,
  LessonModal,
  ModerPanel,
  SubjectsNote
} from './constants/lazyImports';
import { AuthGuard } from './guards/AuthGuard';
import { LocationGuard } from './guards/LocationGuard';
import { Loader } from '@/components/ui/Loader';
import {
  ADD_HOMEWORK_DESKTOP,
  ADD_HOMEWORK_MOBILE,
  ADMIN,
  AUTH,
  ERROR,
  FEATURES,
  JOURNAL_DESKTOP,
  JOURNAL_MOBILE,
  LESSON_MODAL,
  MAIN,
  MODER,
  NOTE
} from '@/utils/configs/routes.config';
import { ADMIN_ROLE, MODERATOR_ROLE } from '@/utils/configs/userRoles.config';
import { JournalChooseMedia } from '@/utils/helpers/ChooseMedia';
import { getUserRole } from '@/utils/redux/storeSlices/userSlice/selectors';

export const Router = () => {
  const userRole = useSelector(getUserRole);
  const journalType = JournalChooseMedia;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
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
            <Suspense fallback={<Loader />}>
              <Auth />
            </Suspense>
          }
        />
        <Route
          path={JOURNAL_MOBILE}
          element={
            <Suspense fallback={<Loader />}>
              <AuthGuard>
                {journalType === '/journal-mobile' ? <JournalMobile /> : <Navigate to={JOURNAL_DESKTOP} />}
              </AuthGuard>
            </Suspense>
          }
        >
          <Route
            path={LESSON_MODAL}
            element={
              <Suspense fallback={<div />}>
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
            <Suspense fallback={<Loader />}>
              <AuthGuard>
                {journalType === '/journal-desktop' ? <JournalDesktop /> : <Navigate to={JOURNAL_MOBILE} />}
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
          path={NOTE}
          element={
            <Suspense fallback={<Loader />}>
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

  React.useEffect(() => { }, []);

  return <RouterProvider router={router} />;
};
