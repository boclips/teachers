import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import React from 'react';
import EmptyCollection from '../../../../..//resources/images/empty-collection.svg';
import BookmarkFilled from '../../../../..//resources/images/unbookmarked.svg';
import bookmarkedCollectionsImg from '../../../../../resources/images/bookmarked-collections.png';
import PageableCollectionCardList from '../../card/list/PageableCollectionCardList';

interface Props {
  maxNumberOfCollections?: number;
  description?: string;
}

class BookmarkedCollectionsGrid extends React.PureComponent<Props> {
  public render() {
    return (
      <PageableCollectionCardList
        title={
          <span>
            <img src={bookmarkedCollectionsImg} alt="" /> My bookmarked
            collections
          </span>
        }
        grid={true}
        description={this.props.description}
        collectionKey="bookmarkedCollections"
        renderIfEmptyCollection={this.renderEmptyCollection()}
      />
    );
  }

  private renderEmptyCollection() {
    return (
      <Row className="collections-view-empty" data-qa="collections-view-empty">
        <Col md={{ offset: 6, span: 12 }} lg={{ offset: 8, span: 8 }}>
          <EmptyCollection />
          <h1 data-qa="no-collections">You have no bookmarks, yet.</h1>
          <p>
            You can add bookmarks by clicking the{' '}
            <BookmarkFilled aria-label="Bookmark a collection" /> icon next to
            collection titles.
          </p>
        </Col>
      </Row>
    );
  }
}

export default BookmarkedCollectionsGrid;
