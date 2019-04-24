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
import { Links } from '../../types/Links';
import State, { getIndexOfCollection } from '../../types/State';
import { VideoId } from '../../types/Video';
import { VideoCollection } from '../../types/VideoCollection';
import './CollectionView.less';

interface OwnProps {
  collectionId: string;
}

interface StateProps {
  collection?: VideoCollection;
  loading: boolean;
  links: Links;
}

interface DispatchProps {
  fetchCollection: () => void;
  fetchVideosForCollection: (request: VideosForCollectionRequest) => void;
}

export class CollectionDetailsView extends PureComponent<
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
          <img src={emptyCollection} alt="Empty collection illustration" />
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
              <img src={sadTeacher} alt="Illustration of a sad woman" />
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

  private fetchVideosIfNeeded() {
    const videoIdsToFetch = this.videoIdsToFetch();

    if (videoIdsToFetch == null || videoIdsToFetch.length === 0) {
      return;
    }

    this.props.fetchVideosForCollection({
      videos: videoIdsToFetch,
      collection: this.props.collection,
    });
  }

  private fetchCollectionIfNeeded() {
    const noCollectionLoaded =
      !this.props.loading && this.props.collection === undefined;

    const differentCollection =
      this.props.collection &&
      this.props.collection.id !== this.props.collectionId;

    if (differentCollection || noCollectionLoaded) {
      this.props.fetchCollection();
    }
  }

  public componentDidMount() {
    this.fetchCollectionIfNeeded();
    this.fetchVideosIfNeeded();
  }

  public componentDidUpdate() {
    this.fetchCollectionIfNeeded();
    this.fetchVideosIfNeeded();
  }

  private videoIdsToFetch(): VideoId[] {
    if (!this.props.collection) {
      return [];
    }

    const { videos, videoIds } = this.props.collection;

    return videoIds.filter(videoId => videos[videoId.id] == null);
  }
}

function mapStateToProps(state: State, props: OwnProps): StateProps {
  if (state.collections.loading) {
    return { collection: undefined, loading: true, links: undefined };
  }
  const indexOfCollection = getIndexOfCollection(
    state.collections.myCollections,
    props.collectionId,
  );

  if (indexOfCollection >= 0) {
    return {
      collection: state.collections.myCollections[indexOfCollection],
      loading: false,
      links: state.links,
    };
  }

  return {
    collection: state.collections.collectionBeingViewed,
    loading: false,
    links: state.links,
  };
}

function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps {
  return {
    fetchCollection: () => {
      dispatch(fetchCollectionAction(ownProps.collectionId));
    },
    fetchVideosForCollection: (request: VideosForCollectionRequest) => {
      return dispatch(fetchVideosForCollectionAction(request));
    },
  };
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionDetailsView);
