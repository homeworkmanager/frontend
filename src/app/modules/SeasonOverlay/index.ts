import { lazy } from 'react';

export const SeasonOverlay = lazy(() =>
  import('./SeasonOverlay').then((module) => ({ default: module.SeasonOverlay }))
);
