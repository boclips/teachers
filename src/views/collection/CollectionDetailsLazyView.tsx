import React, { Suspense } from 'react';
import { LoadingComponent } from '../../components/common/LoadingComponent';
import PageLayout from '../../components/layout/PageLayout';

const CollectionDetailsView = React.lazy(() =>
  import('./CollectionDetailsView'),
);

export interface CollectionDetailsViewProps {
  collectionId: string;
}

export const CollectionDetailsLazyView = (
  props: CollectionDetailsViewProps,
) => (
  <PageLayout showSearchBar={true} showFooter={true} showNavigation={true}>
    <Suspense fallback={<LoadingComponent />}>
      <CollectionDetailsView {...props} />
    </Suspense>
  </PageLayout>
);
