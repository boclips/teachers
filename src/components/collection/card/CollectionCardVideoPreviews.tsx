import { Icon } from 'antd';
import { uuid } from 'boclips-react-player/dist/src/uuid';
import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '../../../types/Video';
import DurationFormatter from '../../common/formatters/DurationFormatter';
import StopClickPropagation from '../../common/StopClickPropagation';
import VideoPlayer from '../../video/player/VideoPlayer';

interface Props {
  videos: Video[];
  numberOfPreviews: number;
  id: string;
  isGrid: boolean;
}

class CollectionCardVideoPreviews extends React.PureComponent<Props> {
  private renderVideoPreviewCount(totalNumberOfVideos: number) {
    return (
      <section key={uuid()} className="video-container">
        <section className="video-container-inner">
          <section className="video-counter">
            <span className="count">
              +
              <span data-qa="collection-video-preview-counter">
                {totalNumberOfVideos - (this.props.numberOfPreviews - 1)}
              </span>
            </span>
            <section className="label">videos</section>
          </section>
        </section>
      </section>
    );
  }

  private renderVideoPreviewPadding() {
    return (
      <section key={uuid()} className="video-container video-container-padding">
        <section className="video-container-inner" />
      </section>
    );
  }

  public render() {
    const previews = [];
    if (this.props.videos.length === this.props.numberOfPreviews) {
      previews.push(
        ...this.props.videos
          .slice(0, this.props.numberOfPreviews)
          .map(video => this.renderVideoPreview(video)),
      );
    } else {
      previews.push(
        ...this.props.videos
          .slice(0, this.props.numberOfPreviews - 1)
          .map(video => this.renderVideoPreview(video)),
      );
    }
    if (this.props.videos.length > this.props.numberOfPreviews) {
      previews.push(this.renderVideoPreviewCount(this.props.videos.length));
    }

    while (previews.length < this.props.numberOfPreviews) {
      previews.push(this.renderVideoPreviewPadding());
    }

    return <section className="collection-video-previews">{previews}</section>;
  }

  private renderVideoPreview(video: Video) {
    return video ? (
      <StopClickPropagation key={`video-${video.id}`}>
        <section
          key={'collection-video-preview' + this.props.id + video.id}
          className="collection-video-preview"
          data-qa="collection-video-preview"
        >
          {this.props.isGrid ? (
            <section className="video-container">
              <section className="video-container-inner">
                <section
                  className="thumbnail-container"
                  style={{ backgroundImage: `url(${video.thumbnailUrl})` }}
                />
              </section>
            </section>
          ) : (
            <section className="video-container">
              <section className="video-container-inner">
                <VideoPlayer video={video} controls="thumbnail" />
              </section>
            </section>
          )}
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
      <CollectionCardVideoPreviews.VideoPreviewSkeleton
        key={'collection-video-preview-skeleton' + this.props.id + uuid()} // TODO does this matter?
      />
    );
  }

  public static Skeleton = (props: { tiny: boolean }) => (
    <section
      className={
        'collection-card skeleton ant-skeleton ant-skeleton-active' +
        (props.tiny ? ' tiny' : '')
      }
    >
      <section className="ant-skeleton-content">
        <h3 className="collection-title ant-skeleton-title" />
        <span className="highlight">
          <span />
        </span>
        <section className="collection-video-previews">
          <section className="ant-skeleton-avatar ant-skeleton-avatar-lg collection-video-preview">
            <section className="ant-skeleton-avatar ant-skeleton-avatar-lg video-container" />
          </section>
          <section className="ant-skeleton-avatar ant-skeleton-avatar-lg collection-video-preview">
            <section className="ant-skeleton-avatar ant-skeleton-avatar-lg video-container" />
          </section>
          <section className="ant-skeleton-avatar ant-skeleton-avatar-lg collection-video-preview">
            <section className="ant-skeleton-avatar ant-skeleton-avatar-lg video-container" />
          </section>
          <section className="ant-skeleton-avatar ant-skeleton-avatar-lg collection-video-preview">
            <section className="ant-skeleton-avatar ant-skeleton-avatar-lg video-container" />
          </section>
        </section>
      </section>
    </section>
  );

  public static VideoPreviewSkeleton = () => (
    <section className="collection-video-preview skeleton">
      <section className="video-container" />
      <section className={'title'} />
      <section className={'subtitle'} />
    </section>
  );
}

export default CollectionCardVideoPreviews;
