import Layout from 'antd/lib/layout/layout';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import { actionCreatorFactory } from '../../redux/actions';
import { RouterState, VideoDetailsState } from '../../State';
import { Video } from '../Video';
import VideoDetails from './VideoDetails';

export const fetchVideoAction = actionCreatorFactory<string>('FETCH_VIDEO');

interface StateProps {
  video: Video;
}

interface DispatchProps {
  fetchVideo: () => void;
}

export class VideoDetailsView extends PureComponent<
  RouteComponentProps<{}> & StateProps & DispatchProps
> {
  public render() {
    return (
      <Layout>
        <section data-qa="video-details-page">
          <section className="video-details-page" data-qa="video-details">
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

function mapStateToProps(state: VideoDetailsState & RouterState): StateProps {
  return {
    video: state.video.item,
  };
}

function mapDispatchToProps(
  dispatch: Dispatch,
  props: RouteComponentProps<{}>,
): DispatchProps {
  return {
    /* tslint:disable:no-string-literal */
    fetchVideo: () => dispatch(fetchVideoAction(props.match.params['videoId'])),
  };
}

export default withRouter(
  connect<StateProps, DispatchProps, {}>(
    mapStateToProps,
    mapDispatchToProps,
  )(VideoDetailsView),
);
