import React, { Suspense } from 'react';
import { LoadingComponent } from '../../components/common/LoadingComponent';
import PageLayout from '../../components/layout/PageLayout';

const MyCollectionView = React.lazy(() => import('./MyCollectionListView'));

export const MyCollectionListLazyView = () => (
  <PageLayout showSearchBar={true} showNavigation={true} showFooter={true}>
    <Suspense fallback={<LoadingComponent />}>
      <MyCollectionView />
    </Suspense>
  </PageLayout>
);
