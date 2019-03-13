import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { VideoCollection } from '../../types/VideoCollection';
import { CollectionCard } from './CollectionCard';
import {
  fetchVideosForCollectionAction,
  VideosForCollectionRequest,
} from './redux/actions/fetchVideosForCollectionAction';

interface Props {
  collection: VideoCollection;
}

const NUMBER_OF_PREVIEWS = 4;

interface DispatchProps {
  fetchVideosForCollection: (request: VideosForCollectionRequest) => void;
}

class CollectionCardContainer extends React.PureComponent<
  Props & DispatchProps
> {
  public render() {
    return (
      <CollectionCard
        collection={this.props.collection}
        numberOfPreviews={NUMBER_OF_PREVIEWS}
      />
    );
  }

  public componentDidMount() {
    this.fetchVideosIfNeeded();
  }

  public componentDidUpdate() {
    this.fetchVideosIfNeeded();
  }

  private fetchVideosIfNeeded() {
    if (this.shouldFetchVideosForCollection()) {
      this.props.fetchVideosForCollection({
        collection: this.props.collection,
        videos: this.props.collection.videoIds.slice(0, NUMBER_OF_PREVIEWS),
      });
    }
  }

  private shouldFetchVideosForCollection(): boolean {
    const { videos, videoIds } = this.props.collection;
    const numberOfVideosLoaded = Object.keys(videos).length;
    return (
      numberOfVideosLoaded !== videoIds.length &&
      numberOfVideosLoaded < NUMBER_OF_PREVIEWS
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    fetchVideosForCollection: (request: VideosForCollectionRequest) =>
      dispatch(fetchVideosForCollectionAction(request)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(CollectionCardContainer);