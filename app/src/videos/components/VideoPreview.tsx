import { Button, Icon, notification } from 'antd';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AppConfig from '../../AppConfig';
import { Video } from '../Video';
import DateFormatter from './DateFormatter';
import DurationFormatter from './DurationFormatter';
import VideoPlayer from './VideoPlayer';

interface Props {
  video: Video;
  searchId: string | null;
}

export default class VideoPreview extends React.PureComponent<Props> {
  public render() {
    return (
      <section className="video-content">
        <section className={'video-thumbnail'}>
          <VideoPlayer
            video={this.props.video}
            searchId={this.props.searchId}
          />
        </section>
        <section className="video-content--video-details">
          <section className={'video-header'}>
            <h3 className="title" data-qa="video-title">
              {this.props.video.title}
            </h3>
            <p data-qa="video-duration" className={'subtitle duration'}>
              <Icon type="clock-circle" />{' '}
              <DurationFormatter duration={this.props.video.duration} />
            </p>
          </section>
          <p className={'subtitle'}>
            Released on{' '}
            <span data-qa="video-released-on">
              <DateFormatter date={this.props.video.releasedOn} />
            </span>{' '}
            by{' '}
            <span data-qa="video-content-provider">
              {this.props.video.contentProvider}
            </span>
          </p>
          <p data-qa="video-description" className="description">
            {this.props.video.description}
          </p>
          <CopyToClipboard
            text={`${AppConfig.getHost()}/videos/${this.props.video.id}`}
            onCopy={this.showCopiedNotification}
          >
            <Button className={'copy-link-button'}>Copy link</Button>
          </CopyToClipboard>
        </section>
      </section>
    );
  }

  private showCopiedNotification(url: string) {
    notification.success({
      message: `${url}`,
      description: `has been copied to your clipboard. Paste link to your tool of choice.`,
      placement: 'bottomRight',
    });
  }
}
