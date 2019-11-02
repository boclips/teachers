import React, { PureComponent } from 'react';

import CollectionsLoaded from '../../components/collection/CollectionsLoaded';
import CollectionDetails from '../../components/collection/details/CollectionDetails';
import CollectionHeader from '../../components/collection/header/CollectionHeader';
import { VideoCardsPlaceholder } from '../../components/searchResults/multiple-results/VideoCardsPlaceholder';
import { CollectionDetailsViewProps } from './CollectionDetailsLazyView';
import './CollectionDetailsView.less';

export class CollectionDetailsView extends PureComponent<
  CollectionDetailsViewProps
> {
  public render() {
    return (
      <section data-qa="collection-page">
        <CollectionsLoaded
          showWhenLoading={this.renderCollectionPlaceholders()}
        >
          <CollectionDetails collectionId={this.props.collectionId} />
        </CollectionsLoaded>
      </section>
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
