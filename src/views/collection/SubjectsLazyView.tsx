import React, { Suspense } from 'react';
import { LoadingComponent } from '../../components/common/LoadingComponent';
import PageLayout from '../../components/layout/PageLayout';

const SubjectsView = React.lazy(() => import('./SubjectsView'));

export const SubjectsLazyView = () => (
  <PageLayout showSearchBar={true} showFooter={true} showNavigation={true}>
    <Suspense fallback={<LoadingComponent />}>
      <SubjectsView />
    </Suspense>
  </PageLayout>
);
