import { Button, Icon, notification } from 'antd';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import tickIcon from '../../../../resources/images/green-check.png';
import AppConfig from '../../../app/AppConfig';
import { Video } from '../../../types/Video';
import DateFormatter from '../components/dateFormatter/DateFormatter';
import DurationFormatter from '../components/durationForammter/DurationFormatter';
import VideoPlayer from '../components/player/VideoPlayer';

interface Props {
  video: Video;
  searchId: string | null;
}

export default class VideoPreview extends React.PureComponent<Props> {
  public render() {
    return (
      <section className="video-content">
        <section className={'video-preview-thumbnail'}>
          <div aria-label={'video player'} tabIndex={0}>
            <VideoPlayer
              video={this.props.video}
              searchId={this.props.searchId}
            />
          </div>
        </section>
        <section className="video-content--video-details">
          <Link
            className="no-underline"
            to={`/videos/${this.props.video.id}`}
            data-qa="link-to-details"
          >
            <section className={'video-header'}>
              <h1 className="title clamp-2-lines" data-qa="video-title">
                {this.props.video.title}
              </h1>
              <p
                data-qa="video-duration"
                aria-hidden={true}
                tabIndex={-1}
                className={'subtitle duration'}
              >
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
                {this.props.video.contentPartner}
              </span>
            </p>
            <p
              data-qa="video-description"
              className="description clamp-3-lines"
            >
              {this.props.video.description}
            </p>
          </Link>
          <CopyToClipboard
            text={`${AppConfig.getHost()}/videos/${this.props.video.id}`}
            onCopy={this.showCopiedNotification}
            options={{ debug: true }}
          >
            <Button
              data-qa="copy-link"
              size={'large'}
              className={'secondary copy-link-button'}
              tabIndex={0}
            >
              Copy link
            </Button>
          </CopyToClipboard>
        </section>
      </section>
    );
  }

  private showCopiedNotification(url: string) {
    notification.success({
      message: url,
      description: (
        <div role="alert">
          `has been copied to your clipboard. Paste link to your tool of
          choice.`
        </div>
      ),
      placement: 'bottomRight',
      icon: <img src={tickIcon} />,
      style: {
        background: '#008F52',
        color: '#FFFFFF',
      },
      duration: 6,
    });
  }
}
