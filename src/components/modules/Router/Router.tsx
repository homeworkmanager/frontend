import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';

import { Layout } from '../Layout/Layout';

import {
  AdminPanel,
  Auth,
  DayHomeworkDesktop,
  DayHomeworkMobile,
  JournalDesktop,
  JournalMobile,
  LessonModal,
  ModerPanel,
  ProfileSettings,
  SubjectsNote
} from './constants/lazyImports';
import {
  addHomeworkDesktop,
  addHomeworkMobile,
  admin,
  auth,
  error,
  journalDesktop,
  journalMobile,
  lessonModal,
  main,
  moder,
  note,
  profile
} from './constants/routes';
import { AuthGuard } from './guards/AuthGuard';
import { LocationGuard } from './guards/LocationGuard';
import { Loader } from '@/components/ui/Loader';
import { AdminRole, ModeratorRole } from '@/utils/constants/userRoles';
import { JournalChooseMedia } from '@/utils/helpers/ChooseMedia';
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
              <Suspense fallback={<div />}>
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
          path={profile}
          element={
            <Suspense fallback={<Loader />}>
              <AuthGuard>
                <ProfileSettings />
              </AuthGuard>
            </Suspense>
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router}></RouterProvider>;
};
