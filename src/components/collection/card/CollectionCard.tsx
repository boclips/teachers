import { Icon } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { VideoId } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
import DurationFormatter from '../../common/formatters/DurationFormatter';
import VideoPlayer from '../../video/player/VideoPlayer';
import { CollectionSubtitle } from '../CollectionSubtitle';
import './CollectionCard.less';
import RemoveCollectionButton from './RemoveCollectionButton';

interface Props {
  collection: VideoCollection;
  numberOfPreviews: number;
}

export class CollectionCard extends React.PureComponent<Props> {
  public render() {
    return (
      <section
        className="collection-card"
        data-qa="collection-card"
        data-state={this.props.collection.title}
      >
        <h1 className="collection-title" data-qa="collection-title">
          {this.props.collection.title}
        </h1>
        <CollectionSubtitle collection={this.props.collection} />
        <RemoveCollectionButton collection={this.props.collection} />
        <section className="collection-video-previews">
          {this.renderVideoPreviews()}
        </section>
        <h3 className="view-collection">
          <Link
            data-state={this.props.collection.title}
            data-qa="view-collection"
            to={'/collections/' + this.props.collection.id}
          >
            View collection
          </Link>
        </h3>
      </section>
    );
  }

  private renderVideoPreviews() {
    const previews = [];
    if (this.props.collection.videoIds.length === this.props.numberOfPreviews) {
      previews.push(
        this.props.collection.videoIds
          .slice(0, this.props.numberOfPreviews)
          .map(videoId => this.renderVideoPreview(videoId)),
      );
    } else {
      previews.push(
        this.props.collection.videoIds
          .slice(0, this.props.numberOfPreviews - 1)
          .map(videoId => this.renderVideoPreview(videoId)),
      );
    }
    if (this.props.collection.videoIds.length > this.props.numberOfPreviews) {
      previews.push(
        this.renderVideoPreviewCount(this.props.collection.videoIds.length),
      );
    }
    return previews;
  }

  private renderVideoPreview(videoId: VideoId) {
    const video = this.props.collection.videos[videoId.id];
    return video ? (
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
    ) : (
      <CollectionCard.VideoPreviewSkeleton />
    );
  }

  private renderVideoPreviewCount(totalNumberOfVideos: number) {
    return (
      <section key="preview-count" className="video-container">
        <section className="video-container-inner">
          <section className="video-counter" key="count">
            <span>
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

  public static VideoPreviewSkeleton = () => (
    <section className="collection-video-preview skeleton ant-skeleton ant-skeleton-active">
      <section className="ant-skeleton-avatar ant-skeleton-avatar-lg collection-video-preview">
        <section className="ant-skeleton-avatar ant-skeleton-avatar-lg video-container" />
      </section>
    </section>
  );
}
