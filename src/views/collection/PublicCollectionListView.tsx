import React, { PureComponent } from 'react';
import GenericCollectionsGrid from '../../components/collection/gridList/GenericCollectionsGrid';
import PageLayout from '../../components/layout/PageLayout';

export class PublicCollectionListView extends PureComponent {
  public render() {
    return (
      <PageLayout>
        <section
          className="public-collection-list collection-list"
          data-qa="public-collection-list-page"
        >
          {this.renderContent()}
        </section>
      </PageLayout>
    );
  }

  public renderContent() {
    return (
      <GenericCollectionsGrid
        collectionKey="publicCollections"
        description="Explore the collections other teachers have created and discover new videos to help engage your students."
      />
    );
  }
}
