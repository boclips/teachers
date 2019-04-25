import { Col, Row } from 'antd';
import React from 'react';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import EmptyCollection from '../../../../resources/images/empty-collection.svg';
import SadTeacher from '../../../../resources/images/sad-teacher.svg';
import { Links } from '../../../types/Links';
import State, { getIndexOfCollection } from '../../../types/State';
import { VideoId } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
import { CollectionVideoCardList } from '../../video/list/VideoCardList';
import CollectionHeader from '../header/CollectionHeader';
import { fetchCollectionAction } from '../redux/actions/fetchCollectionAction';
import {
  fetchVideosForCollectionAction,
  VideosForCollectionRequest,
} from '../redux/actions/fetchVideosForCollectionAction';

interface OwnProps {
  collectionId: string;
}

interface StateProps {
  collection?: VideoCollection;
  links: Links;
}

interface DispatchProps {
  fetchCollection: () => void;
  fetchVideosForCollection: (request: VideosForCollectionRequest) => void;
}

class CollectionDetails extends PureComponent<
  OwnProps & StateProps & DispatchProps
> {
  public render() {
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

  private renderEmptyCollection() {
    return (
      <Row data-qa="collection-view-empty" className="collection-view-empty">
        <Col md={{ offset: 6, span: 12 }} lg={{ offset: 8, span: 8 }}>
          <EmptyCollection />
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
              <SadTeacher />
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
    const noCollectionLoaded = this.props.collection === undefined;

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
  const indexOfCollection = getIndexOfCollection(
    state.collections.myCollections,
    props.collectionId,
  );

  if (indexOfCollection >= 0) {
    return {
      collection: state.collections.myCollections[indexOfCollection],
      links: state.links,
    };
  }

  return {
    collection: state.collections.collectionBeingViewed,
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
)(CollectionDetails);