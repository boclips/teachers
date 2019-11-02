import { Suspense } from 'react';
import React from 'react';
import { LoadingComponent } from '../../components/common/LoadingComponent';
import PageLayout from '../../components/layout/PageLayout';

const HomeView = React.lazy(() => import('./HomeView'));

export const HomeLazyView = () => (
  <PageLayout data-qa="home-page" showNavigation={true} showFooter={true}>
    <Suspense fallback={<LoadingComponent />}>
      <HomeView />
    </Suspense>
  </PageLayout>
);
