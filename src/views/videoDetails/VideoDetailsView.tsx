import Layout from 'antd/lib/layout/layout';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { actionCreatorFactory } from '../../app/redux/actions';
import LoginProvider from '../../components/login/LoginProvider';
import VideoDetails from '../../components/video/details/VideoDetails';
import { VideoDetailsState } from '../../types/State';
import { Video } from '../../types/Video';

export const fetchVideoAction = actionCreatorFactory<string>('FETCH_VIDEO');

interface OwnProps {
  videoId: string;
}

interface StateProps {
  video: Video;
}

interface DispatchProps {
  fetchVideo: () => void;
}

export class VideoDetailsView extends PureComponent<
  StateProps & DispatchProps
> {
  public render() {
    return (
      <LoginProvider>
        <Layout>
          <section data-qa="video-details-page">
            <section className="video-details-page" data-qa="video-details">
              <VideoDetails video={this.props.video} />
            </section>
          </section>
        </Layout>
      </LoginProvider>
    );
  }

  public componentDidMount() {
    this.props.fetchVideo();
  }
}

function mapStateToProps(state: VideoDetailsState): StateProps {
  return {
    video: state.video.item,
  };
}

function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps {
  return {
    fetchVideo: () => dispatch(fetchVideoAction(ownProps.videoId)),
  };
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(VideoDetailsView);
