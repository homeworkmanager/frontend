import { Suspense } from 'react';

import { ErrorBoundary } from '../guards/ErrorBoundary';

export const SuspenseBoundary = (props: React.SuspenseProps) => (
  <Suspense {...props}>
    <ErrorBoundary>{props.children}</ErrorBoundary>
  </Suspense>
);
