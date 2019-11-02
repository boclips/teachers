import React, { Suspense } from 'react';
import { LoadingComponent } from '../../components/common/LoadingComponent';
import PageLayout from '../../components/layout/PageLayout';

const DiscoverCollectionsView = React.lazy(() =>
  import('./DiscoverCollectionsView'),
);

export interface DiscoverCollectionsViewProps {
  subjectIds?: string[];
  disciplineId?: string;
}

export const DiscoverCollectionsLazyView = (
  props: DiscoverCollectionsViewProps,
) => (
  <PageLayout showNavigation={true} showSearchBar={true} showFooter={true}>
    <Suspense fallback={<LoadingComponent />}>
      <DiscoverCollectionsView {...props} />
    </Suspense>
  </PageLayout>
);
