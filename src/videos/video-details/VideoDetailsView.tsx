import Layout from 'antd/lib/layout/layout';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

interface OwnProps {
  videoId: string;
}
interface StateProps {}

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

function mapStateToProps(): StateProps {
  return {};
}

export default connect<StateProps, {}, OwnProps>(
  mapStateToProps,
  null,
)(VideoDetailsView);
