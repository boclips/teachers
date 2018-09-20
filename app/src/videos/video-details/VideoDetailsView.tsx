import Layout from 'antd/lib/layout/layout';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { actionCreatorFactory } from '../../redux/actions';
import { VideoDetailsState } from '../../State';
import { Video } from '../Video';
import VideoDetails from './VideoDetails';

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
      <Layout>
        <section data-qa="video-details-page">
          <section data-qa="video-details">
            <VideoDetails video={this.props.video} />
          </section>
        </section>
      </Layout>
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
  props: OwnProps,
): DispatchProps {
  return {
    fetchVideo: () => dispatch(fetchVideoAction(props.videoId)),
  };
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(VideoDetailsView);
