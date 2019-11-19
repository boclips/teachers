import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import PageLayout from '../../components/layout/PageLayout';
import VideoDetails from '../../components/video/details/VideoDetails';
import { fetchVideoAction } from '../../components/video/redux/actions/fetchVideoAction';
import { getVideoById } from '../../components/video/redux/reducers/videoReducer';
import State from '../../types/State';
import { Video } from '../../types/Video';

interface OwnProps {
  videoId: string;
}

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
      <PageLayout
        title={this.props.video && this.props.video.title}
        showNavigation={true}
        showFooter={true}
        showSearchBar={true}
      >
        <section data-qa="video-details-page">
          <section className="video-details-page" data-qa="video-details">
            <VideoDetails video={this.props.video} />
          </section>
        </section>
      </PageLayout>
    );
  }

  public componentDidMount() {
    this.props.fetchVideo();
  }
}

const mapStateToProps = (state: State, props: OwnProps): StateProps => ({
  video: getVideoById(state, props.videoId),
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps => ({
  fetchVideo: () => dispatch(fetchVideoAction(ownProps.videoId)),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(VideoDetailsView);
