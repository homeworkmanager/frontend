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
  ModerPanel,
  SubjectsNote
} from './constants/lazyImports';
import { AuthGuard } from './guards/AuthGuard';
import { LocationGuard } from './guards/LocationGuard';
import { SuspenseBoundary } from './SuspenseBoundary';
import { LessonModal } from '@/components/pages/Journal/modules/LessonModal/LessonModal';
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
            <SuspenseBoundary fallback={<Loader />}>
              <Auth />
            </SuspenseBoundary>
          }
        />
        <Route
          path={JOURNAL_MOBILE}
          element={
            <SuspenseBoundary fallback={<Loader />} key={JOURNAL_MOBILE}>
              <AuthGuard>
                {journalType === JOURNAL_MOBILE ? <JournalMobile /> : <Navigate to={JOURNAL_DESKTOP} />}
              </AuthGuard>
            </SuspenseBoundary>
          }
        >
          <Route
            path={LESSON_MODAL}
            element={
              <LocationGuard>
                <LessonModal />
              </LocationGuard>
            }
          />
        </Route>

        <Route
          path={JOURNAL_DESKTOP}
          element={
            <SuspenseBoundary fallback={<Loader />} key={JOURNAL_DESKTOP}>
              <AuthGuard>
                {journalType === JOURNAL_DESKTOP ? <JournalDesktop /> : <Navigate to={JOURNAL_MOBILE} />}
              </AuthGuard>
            </SuspenseBoundary>
          }
        >
          <Route
            path={LESSON_MODAL}
            element={
              <LocationGuard>
                <LessonModal />
              </LocationGuard>
            }
          />
        </Route>

        <Route
          path={ADMIN}
          element={
            <SuspenseBoundary fallback={<Loader />} key={ADMIN}>
              <AuthGuard>{userRole === ADMIN_ROLE ? <AdminPanel /> : <Navigate to={journalType} />}</AuthGuard>
            </SuspenseBoundary>
          }
        />

        <Route
          path={MODER}
          element={
            <SuspenseBoundary fallback={<Loader />} key={MODER}>
              <AuthGuard>{userRole === MODERATOR_ROLE ? <ModerPanel /> : <Navigate to={journalType} />}</AuthGuard>
            </SuspenseBoundary>
          }
        />

        <Route
          path={ADD_HOMEWORK_MOBILE}
          element={
            <SuspenseBoundary fallback={<Loader />} key={ADD_HOMEWORK_MOBILE}>
              <AuthGuard>
                {userRole >= MODERATOR_ROLE ? <DayHomeworkMobile /> : <Navigate to={JOURNAL_MOBILE} />}
              </AuthGuard>
            </SuspenseBoundary>
          }
        />

        <Route
          path={ADD_HOMEWORK_DESKTOP}
          element={
            <SuspenseBoundary fallback={<Loader />} key={ADD_HOMEWORK_DESKTOP}>
              <AuthGuard>
                {userRole >= MODERATOR_ROLE ? <DayHomeworkDesktop /> : <Navigate to={JOURNAL_DESKTOP} />}
              </AuthGuard>
            </SuspenseBoundary>
          }
        />

        <Route
          path={AGGREGATE_HOMEWORK}
          element={
            <SuspenseBoundary fallback={<Loader />} key={AGGREGATE_HOMEWORK}>
              <AuthGuard>
                <HomeworkAggregated />
              </AuthGuard>
            </SuspenseBoundary>
          }
        />

        <Route
          path={NOTE}
          element={
            <SuspenseBoundary fallback={<Loader />} key={NOTE}>
              <AuthGuard>
                <SubjectsNote />
              </AuthGuard>
            </SuspenseBoundary>
          }
        />

        <Route
          path={FEATURES}
          element={
            <SuspenseBoundary key={FEATURES}>
              <AuthGuard>
                <Features />
              </AuthGuard>
            </SuspenseBoundary>
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
