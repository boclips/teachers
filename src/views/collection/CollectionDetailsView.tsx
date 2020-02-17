import React from 'react';

import { CollectionDetails } from '../../components/collection/details/CollectionDetails';
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
        <CollectionDetails collectionId={props.collectionId} />
      </section>
    </PageLayout>
  );
};
