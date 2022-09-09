import { LazyExoticComponent, Suspense } from 'react';

export const Loadable = (Component: LazyExoticComponent<() => JSX.Element>) => () =>
  (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
