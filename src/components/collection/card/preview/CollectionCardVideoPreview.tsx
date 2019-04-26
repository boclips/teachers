import { Icon } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '../../../../types/Video';
import DurationFormatter from '../../../common/formatters/DurationFormatter';
import StopClickPropagation from '../../../common/StopClickPropagation';
import VideoPlayer from '../../../video/player/VideoPlayer';
import './CollectionCardVideoPreview.less';

interface Props {
  video: Video;
  isGrid: boolean;
  id: string;
}

class CollectionCardVideoPreview extends React.PureComponent<Props> {
  private renderThumbnailContainer() {
    return (
      <section className="video-container">
        <section className="video-container-inner">
          <section
            className="thumbnail-container"
            style={{ backgroundImage: `url(${this.props.video.thumbnailUrl})` }}
          />
        </section>
      </section>
    );
  }

  private renderVideoContainer() {
    return (
      <section className="video-container">
        <section className="video-container-inner">
          <VideoPlayer video={this.props.video} controls="thumbnail" />
        </section>
      </section>
    );
  }

  public static VideoPreviewSkeleton = () => (
    <section className="collection-video-preview skeleton">
      <section className="video-container" />
      <section className={'title'} />
      <section className={'subtitle'} />
    </section>
  );

  public render() {
    const video = this.props.video;
    return video ? (
      <StopClickPropagation key={`video-${video.id}`}>
        <section
          className="collection-video-preview"
          data-qa="collection-video-preview"
        >
          {this.props.isGrid
            ? this.renderThumbnailContainer()
            : this.renderVideoContainer()}
          <Link
            to={`/videos/${video.id}`}
            className="title clamp-2-lines link--secondary"
          >
            {video.title}
          </Link>
          <section data-qa="video-duration" className={'subtitle duration'}>
            <Icon type="clock-circle" />{' '}
            <DurationFormatter duration={video.duration} />
          </section>
        </section>
      </StopClickPropagation>
    ) : (
      <CollectionCardVideoPreview.VideoPreviewSkeleton />
    );
  }
}

export default CollectionCardVideoPreview;
