import React from 'react';

import CollectionsLoaded from '../../components/collection/CollectionsLoaded';
import CollectionDetails, {
  CollectionDetailsSkeleton,
} from '../../components/collection/details/CollectionDetails';
import PageLayout from '../../components/layout/PageLayout';
import './CollectionDetailsView.less';
import { useRefererIdInjector } from '../../hooks/useRefererIdInjector';

interface Props {
  collectionId: string;
}

export const CollectionDetailsView = (props: Props) => {
  useRefererIdInjector();

  return (
    <PageLayout showSearchBar={true} showFooter={true} showNavigation={true}>
      <section data-qa="collection-page">
        <CollectionsLoaded showWhileLoading={CollectionDetailsSkeleton}>
          <CollectionDetails collectionId={props.collectionId} />
        </CollectionsLoaded>
      </section>
    </PageLayout>
  );
};
