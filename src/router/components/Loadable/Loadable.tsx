import { LazyExoticComponent, Suspense } from 'react';
import { Loading } from 'src/components';

export const Loadable = (Component: LazyExoticComponent<() => JSX.Element>) => () =>
  (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
