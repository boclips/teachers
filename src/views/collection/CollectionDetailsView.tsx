import React, { PureComponent } from 'react';

import CollectionsLoaded from '../../components/collection/CollectionsLoaded';
import CollectionDetails, {
  CollectionDetailsSkeleton,
} from '../../components/collection/details/CollectionDetails';
import PageLayout from '../../components/layout/PageLayout';
import './CollectionDetailsView.less';

interface Props {
  collectionId: string;
}

export class CollectionDetailsView extends PureComponent<Props> {
  public render() {
    return (
      <PageLayout showSearchBar={true} showFooter={true} showNavigation={true}>
        <section data-qa="collection-page">
          <CollectionsLoaded showWhileLoading={CollectionDetailsSkeleton}>
            <CollectionDetails collectionId={this.props.collectionId} />
          </CollectionsLoaded>
        </section>
      </PageLayout>
    );
  }
}

export default CollectionDetailsView;
