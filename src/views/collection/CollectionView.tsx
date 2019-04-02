import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import emptyCollection from '../../../resources/images/empty-collection.svg';
import sadTeacher from '../../../resources/images/sad-teacher.svg';
import CollectionHeader from '../../components/collection/header/CollectionHeader';
import { fetchCollectionAction } from '../../components/collection/redux/actions/fetchCollectionAction';
import {
  fetchVideosForCollectionAction,
  VideosForCollectionRequest,
} from '../../components/collection/redux/actions/fetchVideosForCollectionAction';
import PageLayout from '../../components/layout/PageLayout';
import { VideoCardsPlaceholder } from '../../components/searchResults/multiple-results/VideoCardsPlaceholder';
import { CollectionVideoCardList } from '../../components/video/list/VideoCardList';
import { CollectionState, getIndexOfCollection } from '../../types/State';
import { VideoId } from '../../types/Video';
import { VideoCollection } from '../../types/VideoCollection';
import './CollectionView.less';

interface OwnProps {
  collectionId: string;
}

interface StateProps {
  collection?: VideoCollection;
  loading: boolean;
}

interface DispatchProps {
  fetchCollection: () => void;
  fetchVideosForCollection: (request: VideosForCollectionRequest) => void;
}

export class CollectionView extends PureComponent<
  OwnProps & StateProps & DispatchProps
> {
  public render() {
    return (
      <PageLayout>
        <section data-qa="collection-page">{this.renderContent()}</section>
      </PageLayout>
    );
  }

  public renderContent() {
    if (this.props.loading) {
      return this.renderCollectionPlaceholders();
    }
    if (!this.props.collection) {
      return this.renderCollectionNotFound();
    }

    const videos = this.props.collection.videoIds.map(
      videoId => this.props.collection.videos[videoId.id],
    );

    return (
      <section className="collection-view__collection-details">
        <CollectionHeader collection={this.props.collection} />
        {this.props.collection.videoIds.length === 0
          ? this.renderEmptyCollection()
          : this.props.collection.videos && (
              <CollectionVideoCardList
                videos={videos}
                currentCollection={this.props.collection}
              />
            )}
      </section>
    );
  }

  public renderCollectionPlaceholders() {
    return (
      <section className="collection-view-placeholders">
        <CollectionHeader.Skeleton />
        <VideoCardsPlaceholder />
      </section>
    );
  }

  private renderEmptyCollection() {
    return (
      <Row data-qa="collection-view-empty" className="collection-view-empty">
        <Col md={{ offset: 6, span: 12 }} lg={{ offset: 8, span: 8 }}>
          <img src={emptyCollection} />
          <h1 data-qa="collection-empty-title">
            This video collection is empty
          </h1>
          <p>
            You can add videos by searching for a topic and then clicking the
            Save button on your favorite videos
          </p>
        </Col>
      </Row>
    );
  }

  private renderCollectionNotFound() {
    return (
      <section className="illustrated-page" data-qa="collection-not-found">
        <Row>
          <Col sm={{ span: 24 }} md={{ span: 8 }}>
            <section className="illustration">
              <img src={sadTeacher} />
            </section>
          </Col>
          <Col sm={{ span: 24 }} md={{ span: 16 }}>
            <section className="message">
              <h1 className="big-title">Oops!!</h1>
              <p>The collection you tried to access is not available.</p>
            </section>
          </Col>
        </Row>
      </section>
    );
  }

  private fetchCollectionIfNeeded() {
    if (
      this.props.collection &&
      this.props.collection.id === this.props.collectionId
    ) {
      this.props.fetchVideosForCollection({
        videos: this.videoIdsToFetch(),
        collection: this.props.collection,
      });
    } else if (
      !this.props.loading &&
      (this.props.collection === undefined ||
        (this.props.collection &&
          this.props.collection.id !== this.props.collectionId))
    ) {
      this.props.fetchCollection();
    }
  }

  public componentDidMount() {
    this.fetchCollectionIfNeeded();
  }

  public componentDidUpdate() {
    this.fetchCollectionIfNeeded();
  }

  private videoIdsToFetch(): VideoId[] {
    if (!this.props.collection) {
      return [];
    }

    const { videos, videoIds } = this.props.collection;

    return videoIds.filter(videoId => videos[videoId.id] == null);
  }
}

function mapStateToProps(state: CollectionState, props: OwnProps): StateProps {
  const indexOfCollection = getIndexOfCollection(
    state.collections.myCollections,
    props.collectionId,
  );
  if (state.collections.loading) {
    return { collection: undefined, loading: true };
  }
  if (indexOfCollection >= 0) {
    return {
      collection: state.collections.myCollections[indexOfCollection],
      loading: false,
    };
  }
  return {
    collection: state.collections.publicCollectionDetails,
    loading: false,
  };
}

function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps {
  return {
    fetchCollection: () =>
      dispatch(fetchCollectionAction(ownProps.collectionId)),
    fetchVideosForCollection: (request: VideosForCollectionRequest) =>
      dispatch(fetchVideosForCollectionAction(request)),
  };
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionView);
