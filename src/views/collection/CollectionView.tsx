import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import emptyCollection from '../../../resources/images/empty-collection.svg';
import CollectionHeader from '../../components/collection/header/CollectionHeader';
import { fetchCollectionsAction } from '../../components/collection/redux/actions/fetchCollectionsAction';
import {
  fetchVideosForCollectionAction,
  VideosForCollectionRequest,
} from '../../components/collection/redux/actions/fetchVideosForCollectionAction';
import { renameCollectionAction } from '../../components/collection/redux/actions/renameCollectionAction';
import PageLayout from '../../components/layout/PageLayout';
import { CollectionVideoCardList } from '../../components/video/list/VideoCardList';
import { CollectionState } from '../../types/State';
import { VideoId } from '../../types/Video';
import { VideoCollection } from '../../types/VideoCollection';
import './CollectionView.less';

interface OwnProps {
  collectionId: string;
}

interface StateProps {
  collection?: VideoCollection;
}

interface DispatchProps {
  fetchCollections: () => void;
  onRenameCollection: (collection: VideoCollection) => (title: string) => void;
  fetchVideosForCollection: (request: VideosForCollectionRequest) => void;
}

export class CollectionView extends PureComponent<StateProps & DispatchProps> {
  public render() {
    return (
      <PageLayout>
        <section data-qa="collection-page">{this.renderContent()}</section>
      </PageLayout>
    );
  }

  public renderContent() {
    if (!this.props.collection || !this.props.collection.videos) {
      return null;
    }
    if (this.props.collection.videoIds.length === 0) {
      return this.renderEmptyCollection();
    }

    const videos = this.props.collection.videoIds
      .filter(videoId => this.props.collection.videos[videoId.id] !== undefined)
      .map(videoId => this.props.collection.videos[videoId.id]);

    return (
      <section className="collection-view__collection-details">
        <CollectionHeader collection={this.props.collection} />
        {this.props.collection.videos && (
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
      <Row className="collection-view-empty">
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

  public componentDidMount() {
    if (this.props.collection) {
      this.props.fetchVideosForCollection({
        videos: this.videoIdsToFetch(),
        collection: this.props.collection,
      });
    }
  }

  public componentDidUpdate() {
    if (this.props.collection) {
      this.props.fetchVideosForCollection({
        videos: this.videoIdsToFetch(),
        collection: this.props.collection,
      });
    }
  }

  private videoIdsToFetch(): VideoId[] {
    if (!this.props.collection) {
      return [];
    }

    const { videos, videoIds } = this.props.collection;

    return videoIds.filter(videoId => videos[videoId.id] == null);
  }
}

function mapStateToProps(
  state: CollectionState,
  ownProps: OwnProps,
): StateProps {
  return {
    collection: state.collections.items.find(
      c => c.id === ownProps.collectionId,
    ),
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    fetchCollections: () => dispatch(fetchCollectionsAction()),
    fetchVideosForCollection: (request: VideosForCollectionRequest) =>
      dispatch(fetchVideosForCollectionAction(request)),
    onRenameCollection: (collection: VideoCollection) =>
      collection.links.edit
        ? (title: string) =>
            dispatch(
              renameCollectionAction({ title, originalCollection: collection }),
            )
        : undefined,
  };
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionView);
