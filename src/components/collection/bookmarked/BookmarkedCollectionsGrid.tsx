import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import bookmarkedCollectionsImg from '../../../../resources/images/bookmarked-collections.png';
import emptyCollection from '../../../../resources/images/empty-collection.svg';
import bookmarkFilled from '../../../../resources/images/unbookmarked.svg';
import State from '../../../types/State';
import { VideoCollection } from '../../../types/VideoCollection';
import { CollectionCardList } from '../card/CollectionCardList';
import { fetchBookmarkedCollectionsAction } from '../redux/actions/fetchBookmarkedCollectionsAction';
import { fetchNextBookmarkedCollectionsAction } from '../redux/actions/fetchNextBookmarkedCollectionsAction';

interface Props {
  maxNumberOfCollections?: number;
  description?: string;
}

interface StateProps {
  bookmarkedCollections: VideoCollection[];
  loading: boolean;
  canFetchBookmarkedCollections: boolean;
  hasMoreBookmarkedCollections: boolean;
}

interface DispatchProps {
  fetchBookmarkedCollections: () => void;
  fetchNextPage: () => void;
}

class BookmarkedCollectionsGrid extends React.PureComponent<
  Props & StateProps & DispatchProps
> {
  public render() {
    if (!this.props.bookmarkedCollections) {
      return null;
    }

    if (
      this.props.bookmarkedCollections &&
      this.props.bookmarkedCollections.length === 0
    ) {
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
        loading={this.props.loading}
        collections={this.props.bookmarkedCollections}
        maxNumberOfCollections={this.props.maxNumberOfCollections}
        infiniteScroll={
          this.props.maxNumberOfCollections
            ? undefined
            : {
                next: this.props.fetchNextPage,
                hasMore: this.props.hasMoreBookmarkedCollections,
              }
        }
      />
    );
  }

  public componentDidMount(): void {
    this.fetchCollectionsIfNeeded();
  }

  public componentDidUpdate(): void {
    this.fetchCollectionsIfNeeded();
  }

  private renderEmptyCollection() {
    return (
      <Row className="collections-view-empty" data-qa="collections-view-empty">
        <Col md={{ offset: 6, span: 12 }} lg={{ offset: 8, span: 8 }}>
          <img src={emptyCollection} alt="No bookmarks illustration" />
          <h1 data-qa="no-collections">You have no bookmarks, yet.</h1>
          <p>
            You can add bookmarks by clicking the{' '}
            <img src={bookmarkFilled} alt="Bookmark collection" /> icon next to
            collection titles.
          </p>
        </Col>
      </Row>
    );
  }

  private fetchCollectionsIfNeeded() {
    if (
      !this.props.bookmarkedCollections &&
      this.props.canFetchBookmarkedCollections
    ) {
      this.props.fetchBookmarkedCollections();
    }
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  fetchBookmarkedCollections: () =>
    dispatch(fetchBookmarkedCollectionsAction()),
  fetchNextPage: () => dispatch(fetchNextBookmarkedCollectionsAction()),
});

function mapStateToProps({ collections, links }: State): StateProps {
  return {
    loading: collections.loading,
    bookmarkedCollections:
      collections.bookmarkedCollections &&
      collections.bookmarkedCollections.items,
    hasMoreBookmarkedCollections:
      collections.bookmarkedCollections &&
      collections.bookmarkedCollections.links &&
      collections.bookmarkedCollections.links.next &&
      true,
    canFetchBookmarkedCollections: links && links.bookmarkedCollections && true,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookmarkedCollectionsGrid);
