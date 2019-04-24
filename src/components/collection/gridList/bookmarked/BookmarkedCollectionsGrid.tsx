import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import React from 'react';
import emptyCollection from '../../../../..//resources/images/empty-collection.svg';
import BookmarkFilled from '../../../../..//resources/images/unbookmarked.react.svg';
import bookmarkedCollectionsImg from '../../../../../resources/images/bookmarked-collections.png';
import { VideoCollection } from '../../../../types/VideoCollection';
import { CollectionCardList } from '../../card/CollectionCardList';

interface Props {
  maxNumberOfCollections?: number;
  description?: string;
  fetchNextPage: () => void;
  collections: VideoCollection[];
  hasMoreCollections: boolean;
}

class BookmarkedCollectionsGrid extends React.PureComponent<Props> {
  public render() {
    if (!this.props.collections) {
      return null;
    }

    if (this.props.collections && this.props.collections.length === 0) {
      return this.renderEmptyCollection();
    }

    return (
      <CollectionCardList
        title={
          <span>
            <img src={bookmarkedCollectionsImg} alt="" /> My bookmarked
            collections
          </span>
        }
        description={this.props.description}
        grid={true}
        collections={this.props.collections}
        maxNumberOfCollections={this.props.maxNumberOfCollections}
        infiniteScroll={
          this.props.maxNumberOfCollections
            ? undefined
            : {
                next: this.props.fetchNextPage,
                hasMore: this.props.hasMoreCollections,
              }
        }
      />
    );
  }

  private renderEmptyCollection() {
    return (
      <Row className="collections-view-empty" data-qa="collections-view-empty">
        <Col md={{ offset: 6, span: 12 }} lg={{ offset: 8, span: 8 }}>
          <img src={emptyCollection} alt="No bookmarks illustration" />
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
