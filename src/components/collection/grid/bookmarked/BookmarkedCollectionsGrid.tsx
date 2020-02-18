import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import React from 'react';
import EmptyCollectionSVG from 'resources/images/empty-collection.svg';
import BookmarkFilledSVG from 'resources/images/unbookmarked.svg';
import bookmarkedCollectionsImg from 'resources/images/bookmarked-collections.png';
import PageableCollectionCardList from '../../card/list/PageableCollectionCardList';

class BookmarkedCollectionsGrid extends React.PureComponent {
  public render() {
    return (
      <PageableCollectionCardList
        title={
          <span>
            <img src={bookmarkedCollectionsImg} alt="" /> Your bookmarked
            collections
          </span>
        }
        grid={true}
        collectionKey="bookmarkedCollections"
        renderIfEmptyCollection={this.renderEmptyCollection()}
      />
    );
  }

  private renderEmptyCollection() {
    return (
      <Row className="collections-view-empty" data-qa="collections-view-empty">
        <Col md={{ offset: 6, span: 12 }} lg={{ offset: 8, span: 8 }}>
          <EmptyCollectionSVG />
          <h1 data-qa="no-collections">You have no bookmarks, yet.</h1>
          <p>
            You can add bookmarks by clicking the{' '}
            <BookmarkFilledSVG aria-label="Bookmark a collection" /> icon next
            to collection titles.
          </p>
        </Col>
      </Row>
    );
  }
}

export default BookmarkedCollectionsGrid;
