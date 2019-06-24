import { push } from 'connected-react-router';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { VideoCollection } from '../../../types/VideoCollection';
import { A11yButton } from '../../common/A11yButton';
import {
  fetchVideosForCollectionAction,
  VideosForCollectionRequest,
} from '../redux/actions/fetchVideosForCollectionAction';
import { CollectionCard } from './CollectionCard';

interface Props {
  collection: VideoCollection;
  tiny?: boolean;
}

const NUMBER_OF_PREVIEWS = 4;

interface DispatchProps {
  fetchVideosForCollection: (request: VideosForCollectionRequest) => void;
  goToCollectionDetails: (collection: VideoCollection) => () => void;
}

class CollectionCardContainer extends React.PureComponent<
  Props & DispatchProps
> {
  public render() {
    return (
      <A11yButton
        disableClick={true}
        callback={this.props.goToCollectionDetails(this.props.collection)}
      >
        <Link
          className="no-underline"
          to={'/collections/' + this.props.collection.id}
        >
          <CollectionCard
            tiny={this.props.tiny}
            key={`card-container-${this.props.collection.id}`}
            collection={this.props.collection}
            numberOfPreviews={NUMBER_OF_PREVIEWS}
          />
        </Link>
      </A11yButton>
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
    goToCollectionDetails: (collection: VideoCollection) => () =>
      dispatch(push('/collections/' + collection.id)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(CollectionCardContainer);
