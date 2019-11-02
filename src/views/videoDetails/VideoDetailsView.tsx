import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { actionCreatorFactory } from '../../app/redux/actions';
import VideoDetails from '../../components/video/details/VideoDetails';
import { getVideoById } from '../../components/video/redux/reducers/videoReducer';
import State from '../../types/State';
import { Video } from '../../types/Video';
import { VideoDetailsProps } from './VideoDetailsLazyView';

export const fetchVideoAction = actionCreatorFactory<string>('FETCH_VIDEO');

interface StateProps {
  video: Video | null;
}

interface DispatchProps {
  fetchVideo: () => void;
}

export class VideoDetailsView extends PureComponent<
  StateProps & DispatchProps
> {
  public render() {
    return (
      <section data-qa="video-details-page">
        <section className="video-details-page" data-qa="video-details">
          <VideoDetails video={this.props.video} />
        </section>
      </section>
    );
  }

  public componentDidMount() {
    this.props.fetchVideo();
  }
}

function mapStateToProps(state: State, props: VideoDetailsProps): StateProps {
  return {
    video: getVideoById(state, props.videoId),
  };
}

function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: VideoDetailsProps,
): DispatchProps {
  return {
    fetchVideo: () => dispatch(fetchVideoAction(ownProps.videoId)),
  };
}

export default connect<StateProps, DispatchProps, VideoDetailsProps>(
  mapStateToProps,
  mapDispatchToProps,
)(VideoDetailsView);
