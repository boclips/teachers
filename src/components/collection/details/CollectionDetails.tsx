import { Col, Row } from 'antd';
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import EmptyCollectionSVG from '../../../../resources/images/empty-collection.svg';
import SadTeacherSVG from '../../../../resources/images/sad-teacher.svg';
import { Links } from '../../../types/Links';
import State, { VideoMap } from '../../../types/State';
import { VideoCollection } from '../../../types/VideoCollection';
import { VideoCardsPlaceholder } from '../../searchResults/VideoCardsPlaceholder';
import { CollectionVideoCardList } from '../../video/list/VideoCardList';
import {
  fetchVideosByIdsAction,
  VideosForCollectionRequest,
} from '../../video/redux/actions/fetchVideosByIdsAction';
import { CollectionHeader } from './header/CollectionHeader';
import { fetchCollectionAction } from '../redux/actions/fetchCollectionAction';
import { storeCollectionBeingViewedAction } from '../redux/actions/storeCollectionBeingViewedAction';
import { getCollectionById } from '../redux/reducers/collectionsReducer';

interface OwnProps {
  collectionId: string;
}

interface StateProps {
  collection: VideoCollection | null;
  userId: string | null;
  links: Links;
  videos: VideoMap;
}

interface DispatchProps {
  fetchCollection: () => void;
  fetchVideos: (request: VideosForCollectionRequest) => void;
  storeCollectionBeingViewed: () => void;
}

export class CollectionDetailsSkeleton extends PureComponent {
  public render() {
    return (
      <section className="collection-view-placeholders">
        <CollectionHeader.Skeleton />
        <VideoCardsPlaceholder />
      </section>
    );
  }
}

class CollectionDetails extends PureComponent<
  OwnProps & StateProps & DispatchProps
> {
  public render() {
    if (!this.props.collection) {
      return this.renderCollectionNotFound();
    }

    const videos = this.props.collection.videoIds.map(
      videoId => this.props.videos[videoId.value],
    );

    return (
      <section className="collection-view__collection-details">
        <Helmet>
          <title>{this.props.collection.title}</title>
        </Helmet>
        <CollectionHeader collection={this.props.collection} />
        {this.props.collection.videoIds.length === 0
          ? this.renderEmptyCollection()
          : videos && (
              <CollectionVideoCardList
                videos={videos}
                userId={this.props.userId}
                currentCollection={this.props.collection}
              />
            )}
      </section>
    );
  }

  private renderEmptyCollection() {
    return (
      <Row data-qa="collection-view-empty" className="collection-view-empty">
        <Col md={{ offset: 6, span: 12 }} lg={{ offset: 8, span: 8 }}>
          <EmptyCollectionSVG />
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
              <SadTeacherSVG />
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

  private fetchVideosIfNeeded(): void {
    if (!this.props.collection) {
      return;
    }

    const videoIdsToFetch = this.props.collection.videoIds.filter(
      videoId => typeof this.props.videos[videoId.value] === 'undefined',
    );

    if (videoIdsToFetch.length > 0) {
      this.props.fetchVideos({
        videos: videoIdsToFetch,
      });
    }
  }

  private fetchCollectionIfNeeded() {
    const noCollectionLoaded = typeof this.props.collection === 'undefined';

    const differentCollection =
      this.props.collection &&
      this.props.collection.id !== this.props.collectionId;

    if (differentCollection || noCollectionLoaded) {
      this.props.fetchCollection();
    }
  }

  public componentDidMount() {
    this.fetchCollectionIfNeeded();
    this.props.storeCollectionBeingViewed();
    this.fetchVideosIfNeeded();
  }

  public componentDidUpdate() {
    this.fetchVideosIfNeeded();
  }
}

function mapStateToProps(state: State, props: OwnProps): StateProps {
  const userId = state.user ? state.user.id : null;
  const links = state.links;
  const collection = getCollectionById(state, props.collectionId);
  return { userId, links, collection, videos: state.entities.videos.byId };
}

function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps {
  return {
    fetchCollection: () =>
      dispatch(fetchCollectionAction(ownProps.collectionId)),
    fetchVideos: (request: VideosForCollectionRequest) =>
      dispatch(fetchVideosByIdsAction(request)),
    storeCollectionBeingViewed: () =>
      dispatch(storeCollectionBeingViewedAction({ id: ownProps.collectionId })),
  };
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionDetails);
