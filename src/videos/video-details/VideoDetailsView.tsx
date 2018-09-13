import Layout from 'antd/lib/layout/layout';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { VideoDetailsState } from '../../State';
import { Video } from '../Video';

interface StateProps {
  loading: boolean;
  video: Video;
}

export class VideoDetailsView extends PureComponent<StateProps> {
  public render() {
    return (
      <Layout>
        <section data-qa="video-details-page">
          this is a video, watch and learn
        </section>
      </Layout>
    );
  }
}

function mapStateToProps({ video }: VideoDetailsState): StateProps {
  return { video: video.item, loading: video.loading };
}

export default connect<StateProps, {}, {}>(
  mapStateToProps,
  null,
)(VideoDetailsView);
