import React, { PureComponent } from 'react';
import BookmarkedCollectionsGrid from '../../components/collection/bookmarked/BookmarkedCollectionsGrid';
import PageLayout from '../../components/layout/PageLayout';

export class BookmarkedCollectionListView extends PureComponent {
  public render() {
    return (
      <PageLayout>
        <section
          className="bookmarked-collection-list collection-list"
          data-qa="bookmarked-collection-list-page"
        >
          {this.renderContent()}
        </section>
      </PageLayout>
    );
  }

  public renderContent() {
    return <BookmarkedCollectionsGrid />;
  }
}
