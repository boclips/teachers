import { Suspense } from 'react';
import React from 'react';
import { LoadingComponent } from '../../components/common/LoadingComponent';
import PageLayout from '../../components/layout/PageLayout';

const BookmarkedCollectionListView = React.lazy(() =>
  import('./BookmarkedCollectionListView'),
);

export const BookmarkedCollectionListLazyView = () => (
  <PageLayout showFooter={true} showNavigation={true} showSearchBar={true}>
    <Suspense fallback={<LoadingComponent />}>
      <BookmarkedCollectionListView />
    </Suspense>
  </PageLayout>
);
