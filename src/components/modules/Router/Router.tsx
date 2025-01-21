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
  ProfileSettings
} from './constants.module';
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
        <Route path="/" element={<Navigate to={isAuth ? journalType : '/auth'} />} />
        <Route path="*" element={<Navigate to="/" replace />} />

        <Route
          path="/auth"
          element={
            <Suspense fallback={<Loader />}>
              <Auth />
            </Suspense>
          }
        />
        {isAuth && (
          <>
            <Route
              path="/journal-mobile"
              element={
                <Suspense fallback={<Loader />}>
                  {journalType === '/journal-mobile' ? <JournalMobile /> : <Navigate to={journalType} />}
                </Suspense>
              }
            />

            <Route
              path="/journal-desktop"
              element={
                <Suspense fallback={<Loader />}>
                  {journalType === '/journal-desktop' ? <JournalDesktop /> : <Navigate to={journalType} />}
                </Suspense>
              }
            />

            <Route
              path="/moderator-mobile"
              element={
                <Suspense fallback={<Loader />}>
                  {userRole >= ModeratorRole ? <DayHomeworkMobile /> : <Navigate to={journalType} />}
                </Suspense>
              }
            />

            <Route
              path="/moderator-desktop"
              element={
                <Suspense fallback={<Loader />}>
                  {userRole >= ModeratorRole ? <DayHomeworkDesktop /> : <Navigate to={journalType} />}
                </Suspense>
              }
            />
            <Route
              path="/profile"
              element={
                <Suspense fallback={<Loader />}>
                  <ProfileSettings />
                </Suspense>
              }
            />

            <Route
              path="/admin"
              element={
                <Suspense fallback={<Loader />}>
                  {userRole === AdminRole ? <AdminPanel /> : <Navigate to={journalType} />}
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
