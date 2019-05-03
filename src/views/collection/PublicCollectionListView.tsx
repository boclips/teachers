import React, { PureComponent } from 'react';
import PublicCollectionsGrid from '../../components/collection/grid/public/PublicCollectionsGrid';
import PageLayout from '../../components/layout/PageLayout';

export class PublicCollectionListView extends PureComponent {
  public render() {
    return (
      <PageLayout>
        <section
          className="public-collection-list collection-list"
          data-qa="public-collection-list-page"
        >
          <PublicCollectionsGrid description="Explore the collections other teachers have created and discover new videos to help engage your students." />
        </section>
      </PageLayout>
    );
  }
}
