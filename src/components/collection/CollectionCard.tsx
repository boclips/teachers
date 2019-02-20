import { Icon } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '../../types/Video';
import { VideoCollection } from '../../types/VideoCollection';
import DurationFormatter from '../common/formatters/DurationFormatter';
import VideoPlayer from '../video/player/VideoPlayer';
import './CollectionCard.less';

interface Props {
  collection: VideoCollection;
}

const NUMBER_OF_PREVIEWS = 4;

export class CollectionCard extends React.PureComponent<Props> {
  public render() {
    return (
      <section className="collection-card" data-qa="collection-card">
        <h1 className="collection-title" data-qa="collection-title">
          {this.props.collection.title}
        </h1>
        <span className="highlight">
          <span data-qa="collection-number-of-videos">
            {this.props.collection.videos.length}
          </span>{' '}
          videos
        </span>
        <section className="collection-video-previews">
          {this.renderVideoPreviews()}
        </section>
        <h3 className="view-collection">
          <Link to={'/collections/' + this.props.collection.id}>
            View collection
          </Link>
        </h3>
      </section>
    );
  }

  private renderVideoPreviews() {
    const previews = [];
    if (this.props.collection.videos.length === NUMBER_OF_PREVIEWS) {
      previews.push(
        this.props.collection.videos
          .slice(0, NUMBER_OF_PREVIEWS)
          .map(this.renderVideoPreview),
      );
    } else {
      previews.push(
        this.props.collection.videos
          .slice(0, NUMBER_OF_PREVIEWS - 1)
          .map(this.renderVideoPreview),
      );
    }
    if (this.props.collection.videos.length > NUMBER_OF_PREVIEWS) {
      previews.push(
        this.renderVideoPreviewCount(this.props.collection.videos.length),
      );
    }
    return previews;
  }

  private renderVideoPreview(video: Video) {
    return (
      <section
        key={video.id}
        className="collection-video-preview"
        data-qa="collection-video-preview"
      >
        <section className="video-container">
          <section className="video-container-inner">
            <VideoPlayer video={video} controls="thumbnail" />
          </section>
        </section>
        <section className="title clamp-2-lines">{video.title}</section>
        <section data-qa="video-duration" className={'subtitle duration'}>
          <Icon type="clock-circle" />{' '}
          <DurationFormatter duration={video.duration} />
        </section>
      </section>
    );
  }

  private renderVideoPreviewCount(totalNumberOfVideos: number) {
    return (
      <section className="video-container">
        <section className="video-container-inner">
          <section className="video-counter" key="count">
            <span>
              +
              <span data-qa="collection-video-preview-counter">
                {totalNumberOfVideos - (NUMBER_OF_PREVIEWS - 1)}
              </span>
            </span>
            <section className="label">videos</section>
          </section>
        </section>
      </section>
    );
  }

  public static Skeleton = () => (
    <section className="collection-card skeleton ant-skeleton ant-skeleton-active">
      <section className="ant-skeleton-content">
        <h3 className="ant-skeleton-title" />
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
}
