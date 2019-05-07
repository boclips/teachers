import { Button } from 'antd';
import React from 'react';
import { Video } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
import CopyLinkButton from './copyLink/CopyLinkButton';
import DownloadTranscriptButton from './DownloadTranscriptButton';
import './VideoButtons.less';
import VideoCollectionButton from './videoCollection/VideoCollectionButton';

interface OwnProps {
  video: Video;
  collection?: VideoCollection;
}

export default class VideoButtons extends React.PureComponent<OwnProps> {
  public render() {
    return (
      <section className="video-buttons__container">
        <Button.Group>
          <VideoCollectionButton
            video={this.props.video}
            collection={this.props.collection}
          />
          <CopyLinkButton video={this.props.video} />
          <DownloadTranscriptButton video={this.props.video} />
        </Button.Group>
      </section>
    );
  }
}
