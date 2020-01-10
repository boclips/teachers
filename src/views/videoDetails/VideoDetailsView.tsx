import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import querystring from 'query-string';
import { RouteComponentProps, withRouter } from 'react-router';
import PageLayout from '../../components/layout/PageLayout';
import VideoDetails from '../../components/video/details/VideoDetails';
import { fetchVideoAction } from '../../components/video/redux/actions/fetchVideoAction';
import { getVideoById } from '../../components/video/redux/reducers/videoReducer';
import State from '../../types/State';
import { Video } from '../../types/Video';
import { ShareCodeDialog } from '../../components/video/ShareCodeDialog/ShareCodeDialog';

interface OwnProps {
  videoId: string;
}

interface StateProps {
  requireShareCode: boolean;
  video: Video | null;
  userId: string;
}

interface DispatchProps {
  fetchVideo: () => void;
}

export class VideoDetailsView extends PureComponent<
  StateProps & DispatchProps & RouteComponentProps & OwnProps
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
        {this.props.requireShareCode && <ShareCodeDialog />}
      </PageLayout>
    );
  }

  public componentDidMount() {
    this.props.fetchVideo();
    this.setUpReferer();
  }

  private setUpReferer() {
    if (
      this.props.userId ||
      this.props.history.location.search.indexOf('referer=') === -1
    ) {
      this.props.history.push({
        pathname: `/videos/${this.props.videoId}`,
        search: `?referer=${this.props.userId || 'anonymous'}`,
      });
    }
  }
}

const mapStateToProps = (state: State, props: OwnProps): StateProps => {
  const params = querystring.parse(state.router.location.search);

  return {
    video: getVideoById(state, props.videoId),
    requireShareCode: !!params.share,
    userId: state.user ? state.user.id : undefined,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps => ({
  fetchVideo: () => dispatch(fetchVideoAction(ownProps.videoId)),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(VideoDetailsView));
