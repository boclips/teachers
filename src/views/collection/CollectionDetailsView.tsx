import React, { PureComponent } from 'react';

import CollectionCardHeader from '../../components/collection/card/header/CollectionCardHeader';
import CollectionsLoaded from '../../components/collection/CollectionsLoaded';
import CollectionDetails from '../../components/collection/details/CollectionDetails';
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
        <CollectionCardHeader.Skeleton />
        <VideoCardsPlaceholder />
      </section>
    );
  }
}

export default CollectionDetailsView;
