import React, { PureComponent } from 'react';

import CollectionsLoaded from '../../components/collection/CollectionsLoaded';
import CollectionDetails from '../../components/collection/details/CollectionDetails';
import CollectionHeader from '../../components/collection/header/CollectionHeader';
import PageLayout from '../../components/layout/PageLayout';
import { VideoCardsPlaceholder } from '../../components/searchResults/multiple-results/VideoCardsPlaceholder';
import './CollectionDetailsView.less';

interface Props {
  collectionId: string;
}

export class CollectionDetailsView extends PureComponent<Props> {
  public render() {
    return (
      <PageLayout>
        <section data-qa="collection-page">
          <CollectionsLoaded
            showWhenLoading={this.renderCollectionPlaceholders()}
          >
            <CollectionDetails collectionId={this.props.collectionId} />
          </CollectionsLoaded>
        </section>
      </PageLayout>
    );
  }

  public renderCollectionPlaceholders() {
    return (
      <section className="collection-view-placeholders">
        <CollectionHeader.Skeleton />
        <VideoCardsPlaceholder />
      </section>
    );
  }
}

export default CollectionDetailsView;
