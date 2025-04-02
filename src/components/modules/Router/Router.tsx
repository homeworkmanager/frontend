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
  addHomeworkDesktop,
  addHomeworkMobile,
  admin,
  auth,
  error,
  features,
  journalDesktop,
  journalMobile,
  lessonModal,
  main,
  moder,
  note
} from '@/utils/configs/routes.config';
import { AdminRole, ModeratorRole } from '@/utils/configs/userRoles.config';
import { JournalChooseMedia } from '@/utils/helpers/chooseMedia';
import { getUserRole } from '@/utils/redux/storeSlices/userSlice/selectors';

export const Router = () => {
  const userRole = useSelector(getUserRole);
  const journalType = JournalChooseMedia;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route
          path={main}
          element={
            <AuthGuard>
              <Navigate to={journalType} />
            </AuthGuard>
          }
        />
        <Route path={error} element={<Navigate to="/" replace />} />

        <Route
          path={auth}
          element={
            <Suspense fallback={<Loader />}>
              <Auth />
            </Suspense>
          }
        />
        <Route
          path={journalMobile}
          element={
            <Suspense fallback={<Loader />}>
              <AuthGuard>
                {journalType === '/journal-mobile' ? <JournalMobile /> : <Navigate to={journalDesktop} />}
              </AuthGuard>
            </Suspense>
          }
        >
          <Route
            path={lessonModal}
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
          path={journalDesktop}
          element={
            <Suspense fallback={<Loader />}>
              <AuthGuard>
                {journalType === '/journal-desktop' ? <JournalDesktop /> : <Navigate to={journalMobile} />}
              </AuthGuard>
            </Suspense>
          }
        >
          <Route
            path={lessonModal}
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
          path={admin}
          element={
            <Suspense fallback={<Loader />}>
              <AuthGuard>{userRole === AdminRole ? <AdminPanel /> : <Navigate to={journalType} />}</AuthGuard>
            </Suspense>
          }
        />

        <Route
          path={moder}
          element={
            <Suspense fallback={<Loader />}>
              <AuthGuard>{userRole === ModeratorRole ? <ModerPanel /> : <Navigate to={journalType} />}</AuthGuard>
            </Suspense>
          }
        />

        <Route
          path={addHomeworkMobile}
          element={
            <Suspense fallback={<Loader />}>
              <AuthGuard>
                {userRole >= ModeratorRole ? <DayHomeworkMobile /> : <Navigate to={journalMobile} />}
              </AuthGuard>
            </Suspense>
          }
        />

        <Route
          path={addHomeworkDesktop}
          element={
            <Suspense fallback={<Loader />}>
              <AuthGuard>
                {userRole >= ModeratorRole ? <DayHomeworkDesktop /> : <Navigate to={journalDesktop} />}
              </AuthGuard>
            </Suspense>
          }
        />

        <Route
          path={note}
          element={
            <Suspense fallback={<Loader />}>
              <AuthGuard>
                <SubjectsNote />
              </AuthGuard>
            </Suspense>
          }
        />

        <Route
          path={features}
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
