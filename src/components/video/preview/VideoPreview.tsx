import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import State from '../../../types/State';
import { Video } from '../../../types/Video';
import VideoPlayer from '../player/VideoPlayer';
import { getVideoById } from '../redux/reducers/videoReducer';

import './VideoPreview.less';

interface OwnProps {
  videoId: string;
}

interface StateProps {
  video?: Video;
}

class VideoPreview extends React.PureComponent<OwnProps & StateProps> {
  public render() {
    return (
      <div
        data-qa="recommended-video"
        className="video-list__recommended-video"
        tabIndex={-1}
      >
        <section className="recommended-video__player">
          <VideoPlayer
            collectionKey="myCollections"
            video={this.props.video}
            mode="card"
          />
        </section>
        <div
          data-qa="recommended-video-title"
          className="recommended-video__title"
        >
          <Link to={`/videos/${this.props.videoId}`}>
            {this.props.video.title}
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => ({
  video: getVideoById(state, ownProps.videoId),
});

export default connect(mapStateToProps)(VideoPreview);
