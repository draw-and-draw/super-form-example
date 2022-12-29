import React, { Suspense } from 'react';

const Loadable = (Component: React.ElementType) => (props: any) =>
  (
    <Suspense fallback={<div />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
