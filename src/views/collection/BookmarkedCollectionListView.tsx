import React, { PureComponent } from 'react';
import BookmarkedCollectionsGrid from '../../components/collection/grid/bookmarked/BookmarkedCollectionsGrid';
import PageLayout from '../../components/layout/PageLayout';

export class BookmarkedCollectionListView extends PureComponent {
  public render() {
    return (
      <PageLayout
        title="Your Bookmarks"
        showFooter={true}
        showNavigation={true}
        showSearchBar={true}
      >
        <section
          className="bookmarked-collection-list collection-list"
          data-qa="bookmarked-collection-list-page"
        >
          <BookmarkedCollectionsGrid />
        </section>
      </PageLayout>
    );
  }
}
