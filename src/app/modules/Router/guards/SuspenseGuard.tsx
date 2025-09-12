import { Suspense } from 'react';

import { ErrorBoundary } from '@/shared/modules/ErrorBoundary';

export const SuspenseGuard = (props: React.SuspenseProps) => (
  <Suspense {...props}>
    <ErrorBoundary>{props.children}</ErrorBoundary>
  </Suspense>
);
