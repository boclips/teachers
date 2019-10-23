import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { actionCreatorFactory } from '../../app/redux/actions';
import PageLayout from '../../components/layout/PageLayout';
import VideoDetails from '../../components/video/details/VideoDetails';
import State from '../../types/State';
import { Video } from '../../types/Video';

export const fetchVideoAction = actionCreatorFactory<string>('FETCH_VIDEO');

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
      <PageLayout showNavigation={true} showFooter={true} showSearchBar={true}>
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

function mapStateToProps(state: State, props: OwnProps): StateProps {
  return {
    video: state.entities.videos.byId[props.videoId],
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
