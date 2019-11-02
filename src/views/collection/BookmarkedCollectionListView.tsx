import React, { PureComponent } from 'react';
import BookmarkedCollectionsGrid from '../../components/collection/grid/bookmarked/BookmarkedCollectionsGrid';

export default class BookmarkedCollectionListView extends PureComponent {
  public render() {
    return (
      <section
        className="bookmarked-collection-list collection-list"
        data-qa="bookmarked-collection-list-page"
      >
        <BookmarkedCollectionsGrid />
      </section>
    );
  }
}
