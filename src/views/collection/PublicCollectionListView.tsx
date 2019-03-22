import React, { PureComponent } from 'react';
import PublicCollectionsGrid from '../../components/collection/public/PublicCollectionsGrid';
import PageLayout from '../../components/layout/PageLayout';
import './PublicCollectionListView.less';

export class PublicCollectionListView extends PureComponent {
  public render() {
    return (
      <PageLayout>
        <section
          className="public-collection-list"
          data-qa="public-collection-list-page"
        >
          {this.renderContent()}
        </section>
      </PageLayout>
    );
  }

  public renderContent() {
    return (
      <PublicCollectionsGrid description="Explore the collections other teachers have created and discover new videos to help engage your students." />
    );
  }
}