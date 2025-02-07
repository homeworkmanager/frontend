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
  ProfileSettings,
  SubjectsNote
} from './constants/lazyImports';
import {
  admin,
  auth,
  error,
  journalDesktop,
  journalMobile,
  main,
  moderatorDesktop,
  moderatorMobile,
  note,
  profile
} from './constants/routes';
import { Loader } from '@/components/ui/Loader';
import { AdminRole, ModeratorRole } from '@/utils/constants/userRoles';
import { JournalChooseMedia } from '@/utils/helpers/ChooseMedia';
import { getUserRole } from '@/utils/redux/storeSlices/userSlice/selectors';

export const Router = () => {
  const isAuth = !!document.cookie.match('session_key=');
  const userRole = useSelector(getUserRole);
  const journalType = JournalChooseMedia;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path={main} element={<Navigate to={isAuth ? journalType : '/auth'} />} />
        <Route path={error} element={<Navigate to="/" replace />} />

        <Route
          path={auth}
          element={
            <Suspense fallback={<Loader />}>
              <Auth />
            </Suspense>
          }
        />
        {isAuth && (
          <>
            <Route
              path={journalMobile}
              element={
                <Suspense fallback={<Loader />}>
                  {journalType === '/journal-mobile' ? <JournalMobile /> : <Navigate to={journalDesktop} />}
                </Suspense>
              }
            />

            <Route
              path={journalDesktop}
              element={
                <Suspense fallback={<Loader />}>
                  {journalType === '/journal-desktop' ? <JournalDesktop /> : <Navigate to={journalMobile} />}
                </Suspense>
              }
            />

            <Route
              path={admin}
              element={
                <Suspense fallback={<Loader />}>
                  {userRole === AdminRole ? <AdminPanel /> : <Navigate to={journalType} />}
                </Suspense>
              }
            />

            <Route
              path={moderatorMobile}
              element={
                <Suspense fallback={<Loader />}>
                  {userRole >= ModeratorRole ? <DayHomeworkMobile /> : <Navigate to={journalMobile} />}
                </Suspense>
              }
            />

            <Route
              path={moderatorDesktop}
              element={
                <Suspense fallback={<Loader />}>
                  {userRole >= ModeratorRole ? <DayHomeworkDesktop /> : <Navigate to={journalDesktop} />}
                </Suspense>
              }
            />

            <Route
              path={note}
              element={
                <Suspense fallback={<Loader />}>
                  <SubjectsNote />
                </Suspense>
              }
            />

            <Route
              path={profile}
              element={
                <Suspense fallback={<Loader />}>
                  <ProfileSettings />
                </Suspense>
              }
            />
          </>
        )}
      </Route>
    )
  );

  return <RouterProvider router={router}></RouterProvider>;
};
