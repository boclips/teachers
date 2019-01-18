import { Icon } from 'antd';
import React from 'react';

import { Link } from 'react-router-dom';

import { Video } from '../../../types/Video';
import DateFormatter from '../components/dateFormatter/DateFormatter';
import DurationFormatter from '../components/durationForammter/DurationFormatter';
import VideoPlayer from '../components/player/VideoPlayer';
import VideoPreviewBadge from './VideoPreviewBadge';
import { VideoPreviewButtonsContainer } from './VideoPreviewButtonsContainer';

interface Props {
  video: Video;
  searchId: string | null;
  isInCollection: boolean;
  onToggleInDefaultCollection: (inDefaultCollection: boolean) => void;
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
              <VideoPreviewBadge video={this.props.video} />
              <p
                data-qa="video-duration"
                aria-hidden={true}
                tabIndex={-1}
                className={'duration'}
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
          <VideoPreviewButtonsContainer
            isInCollection={this.props.isInCollection}
            onToggleInDefaultCollection={this.props.onToggleInDefaultCollection}
            video={this.props.video}
          />
        </section>
      </section>
    );
  }
}
