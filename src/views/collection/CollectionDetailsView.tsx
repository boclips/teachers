import React from 'react';

import { CollectionDetails } from '../../components/collection/details/CollectionDetails';
import './CollectionDetailsView.less';
import { useRefererIdInjector } from '../../hooks/useRefererIdInjector';

interface Props {
  collectionId: string;
}

export const CollectionDetailsView = (props: Props) => {
  useRefererIdInjector();

  return (
    <section data-qa="collection-page">
      <CollectionDetails collectionId={props.collectionId} />
    </section>
  );
};
