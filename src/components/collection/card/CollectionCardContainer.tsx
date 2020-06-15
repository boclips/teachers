import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import State from '../../../types/State';
import { Video } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
import {
  fetchVideosByIdsAction,
  VideosForCollectionRequest,
} from '../../video/redux/actions/fetchVideosByIdsAction';
import { getVideosByIds } from '../../video/redux/reducers/videoReducer';
import { CollectionCard } from './CollectionCard';

type Props = OwnProps & DispatchProps & StateProps;

interface OwnProps {
  collection: VideoCollection;
  grid: boolean;
  referer?: string;
}

const NUMBER_OF_PREVIEWS = 4;

interface DispatchProps {
  fetchVideos: (request: VideosForCollectionRequest) => void;
}

interface StateProps {
  videos: Array<Video | undefined>;
}

class CollectionCardContainer extends React.PureComponent<Props> {
  public render() {
    const videos = this.props.videos.filter((video) => video !== undefined);

    return (
      <CollectionCard
        referer={this.props.referer}
        grid={this.props.grid}
        collection={this.props.collection}
        videos={videos}
      />
    );
  }

  public componentDidMount() {
    this.fetchVideosIfNeeded();
  }

  private fetchVideosIfNeeded() {
    if (this.shouldFetchVideosForCollection()) {
      this.props.fetchVideos({
        videos: this.props.collection.videoIds.slice(0, NUMBER_OF_PREVIEWS),
      });
    }
  }

  private shouldFetchVideosForCollection(): boolean {
    const { videoIds } = this.props.collection;

    const { videos } = this.props;

    const numberOfVideosLoaded = videos.filter((it) => it !== undefined).length;

    return (
      numberOfVideosLoaded !== videoIds.length &&
      numberOfVideosLoaded < NUMBER_OF_PREVIEWS
    );
  }
}

function mapStateToProps(state: State, props: OwnProps): StateProps {
  return {
    videos: getVideosByIds(
      state,
      props.collection.videoIds.map((id) => id.value),
    ),
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    fetchVideos: (request: VideosForCollectionRequest) =>
      dispatch(fetchVideosByIdsAction(request)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionCardContainer);
