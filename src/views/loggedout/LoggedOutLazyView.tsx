import { Suspense } from 'react';
import React from 'react';
import { LoadingComponent } from '../../components/common/LoadingComponent';
import PageLayout from '../../components/layout/PageLayout';

const LoggedOutView = React.lazy(() => import('./LoggedOutView'));

export const LoggedOutLazyView = () => (
  <PageLayout showNavigation={false} showFooter={true}>
    <Suspense fallback={<LoadingComponent />}>
      <LoggedOutView />
    </Suspense>
  </PageLayout>
);
