import { Icon } from 'antd';
import React from 'react';

import { Link } from 'react-router-dom';

import { Video } from '../../../types/Video';
import DateFormatter from '../components/dateFormatter/DateFormatter';
import DurationFormatter from '../components/durationForammter/DurationFormatter';
import VideoPlayer from '../components/player/VideoPlayer';
import VideoPreviewBadge from './VideoPreviewBadge';
import { VideoPreviewButtonsContainer } from './VideoPreviewButtonsContainer';
import { VideoHeader } from '../components/VideoHeader';

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
        <VideoHeader video={this.props.video} />

        <section className={'video-preview'}>
          <div aria-label={'video player'} tabIndex={0}>
            <VideoPlayer
              video={this.props.video}
              searchId={this.props.searchId}
            />
          </div>
        </section>

        <section className="video-details">
          <Link
            className="no-underline"
            to={`/videos/${this.props.video.id}`}
            data-qa="link-to-details"
          >
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
