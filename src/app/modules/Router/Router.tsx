import { useSelector } from 'react-redux';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';

import { Root } from '../Root';

import { LazyPages } from './constants/lazyImports';
import { AuthGuard } from './guards/AuthGuard';
import { LocationGuard } from './guards/LocationGuard';
import { SuspenseGuard } from './guards/SuspenseGuard';
import LessonModal from '@/pages/journal/components/LessonModal';
import { Loader } from '@/shared/ui/Loader';
import { PAGES } from '@/utils/constants/pages';
import { USER_ROLES } from '@/utils/constants/userRoles';
import { JournalChooseMedia } from '@/utils/services/chooseMedia';
import { getUserRole } from '@/utils/store/slices/user/selectors';

export const Router = () => {
  const userRole = useSelector(getUserRole);
  const journalType = JournalChooseMedia;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Root />}>
        <Route
          path={PAGES.MAIN}
          element={
            <AuthGuard>
              <Navigate to={journalType} />
            </AuthGuard>
          }
        />
        <Route path={PAGES.ERROR} element={<Navigate to={PAGES.MAIN} replace />} />

        <Route
          path={PAGES.AUTH}
          element={
            <SuspenseGuard fallback={<Loader />}>
              <LazyPages.Auth />
            </SuspenseGuard>
          }
        />
        <Route
          path={PAGES.JOURNAL_MOBILE}
          element={
            <SuspenseGuard fallback={<Loader />} key={PAGES.JOURNAL_MOBILE}>
              <AuthGuard>
                {journalType === PAGES.JOURNAL_MOBILE ? (
                  <LazyPages.JournalMobile />
                ) : (
                  <Navigate to={PAGES.JOURNAL_DESKTOP} />
                )}
              </AuthGuard>
            </SuspenseGuard>
          }
        >
          <Route
            path={PAGES.LESSON_MODAL}
            element={
              <LocationGuard>
                <LessonModal />
              </LocationGuard>
            }
          />
        </Route>

        <Route
          path={PAGES.JOURNAL_DESKTOP}
          element={
            <SuspenseGuard fallback={<Loader />} key={PAGES.JOURNAL_DESKTOP}>
              <AuthGuard>
                {journalType === PAGES.JOURNAL_DESKTOP ? (
                  <LazyPages.JournalDesktop />
                ) : (
                  <Navigate to={PAGES.JOURNAL_MOBILE} />
                )}
              </AuthGuard>
            </SuspenseGuard>
          }
        >
          <Route
            path={PAGES.LESSON_MODAL}
            element={
              <LocationGuard>
                <LessonModal />
              </LocationGuard>
            }
          />
        </Route>

        <Route
          path={PAGES.ADMIN}
          element={
            <SuspenseGuard fallback={<Loader />} key={PAGES.ADMIN}>
              <AuthGuard>
                {userRole === USER_ROLES.ADMIN ? <LazyPages.AdminPanel /> : <Navigate to={journalType} />}
              </AuthGuard>
            </SuspenseGuard>
          }
        />

        <Route
          path={PAGES.MODER}
          element={
            <SuspenseGuard fallback={<Loader />} key={PAGES.MODER}>
              <AuthGuard>
                {userRole === USER_ROLES.MODERATOR ? <LazyPages.ModerPanel /> : <Navigate to={journalType} />}
              </AuthGuard>
            </SuspenseGuard>
          }
        />

        <Route
          path={PAGES.ADD_HOMEWORK_MOBILE}
          element={
            <SuspenseGuard fallback={<Loader />} key={PAGES.ADD_HOMEWORK_MOBILE}>
              <AuthGuard>
                {userRole >= USER_ROLES.MODERATOR ? (
                  <LazyPages.DayHomeworkMobile />
                ) : (
                  <Navigate to={PAGES.JOURNAL_MOBILE} />
                )}
              </AuthGuard>
            </SuspenseGuard>
          }
        />

        <Route
          path={PAGES.ADD_HOMEWORK_DESKTOP}
          element={
            <SuspenseGuard fallback={<Loader />} key={PAGES.ADD_HOMEWORK_DESKTOP}>
              <AuthGuard>
                {userRole >= USER_ROLES.MODERATOR ? (
                  <LazyPages.DayHomeworkDesktop />
                ) : (
                  <Navigate to={PAGES.JOURNAL_DESKTOP} />
                )}
              </AuthGuard>
            </SuspenseGuard>
          }
        />

        <Route
          path={PAGES.AGGREGATE_HOMEWORK}
          element={
            <SuspenseGuard fallback={<Loader />} key={PAGES.AGGREGATE_HOMEWORK}>
              <AuthGuard>
                <LazyPages.HomeworkAggregated />
              </AuthGuard>
            </SuspenseGuard>
          }
        />

        <Route
          path={PAGES.NOTE}
          element={
            <SuspenseGuard fallback={<Loader />} key={PAGES.NOTE}>
              <AuthGuard>
                <LazyPages.SubjectsNote />
              </AuthGuard>
            </SuspenseGuard>
          }
        />

        <Route
          path={PAGES.FEATURES}
          element={
            <SuspenseGuard key={PAGES.FEATURES}>
              <AuthGuard>
                <LazyPages.Features />
              </AuthGuard>
            </SuspenseGuard>
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
