import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '../../../types/Video';
import VideoPlayer from '../components/player/VideoPlayer';
import { VideoHeader } from '../components/VideoHeader';
import VideoPreviewButtonsContainer from './VideoPreviewButtonsContainer';

interface Props {
  video: Video;
  searchId: string | null;
  isInCollection: boolean;
  style: 'search' | 'collection';
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
            video={this.props.video}
            style={this.props.style}
          />
        </section>
      </section>
    );
  }
}
