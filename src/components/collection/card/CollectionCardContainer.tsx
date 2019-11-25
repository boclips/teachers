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
import { CollectionCardTiny } from './CollectionCardTiny';
import { CollectionCardRegular } from './CollectionCardRegular';
import { CollectionCardSearch } from './CollectionCardSearch';

type Props = OwnProps & DispatchProps & StateProps;

interface OwnProps {
  collection: VideoCollection;
  tiny?: boolean;
  mode: 'tiny' | 'search' | 'regular';
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
    const videos = this.props.videos.filter(video => video !== undefined);

    if (this.props.mode === 'tiny') {
      return (
        <CollectionCardTiny
          collection={this.props.collection}
          videos={videos}
        />
      );
    } else if (this.props.mode === 'regular') {
      return (
        <CollectionCardRegular
          collection={this.props.collection}
          videos={videos}
        />
      );
    } else if (this.props.mode === 'search') {
      return (
        <CollectionCardSearch
          collection={this.props.collection}
          videos={videos}
        />
      );
    } else {
      throw new Error(
        'CollectionCardContainer invalid mode:' + this.props.mode,
      );
    }
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

    const numberOfVideosLoaded = videos.filter(it => it !== undefined).length;

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
      props.collection.videoIds.map(id => id.value),
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
