import { Icon } from 'antd';
import { uuid } from 'boclips-react-player/dist/src/uuid';
import classnames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { VideoId } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
import DurationFormatter from '../../common/formatters/DurationFormatter';
import StopClickPropagation from '../../common/StopClickPropagation';
import VideoPlayer from '../../video/player/VideoPlayer';
import { CollectionSubtitle } from '../CollectionSubtitle';
import BookmarkingButton from './BookmarkCollectionButton';
import './CollectionCard.less';
import RemoveCollectionButton from './RemoveCollectionButton';

interface Props {
  collection: VideoCollection;
  numberOfPreviews: number;
  tiny?: boolean;
  onClick?: React.MouseEventHandler;
}

export class CollectionCard extends React.PureComponent<Props> {
  public render() {
    return (
      <section
        key={`card-${this.props.collection.id}`}
        className={classnames('collection-card', {
          tiny: this.props.tiny,
          clickable: !!this.props.onClick,
        })}
        data-qa="collection-card"
        data-state={this.props.collection.title}
        onClick={this.props.onClick}
      >
        <h1
          className="collection-title clamp-2-lines"
          data-qa="collection-title"
        >
          {this.props.collection.title}
        </h1>
        <CollectionSubtitle collection={this.props.collection} />
        <StopClickPropagation>
          <BookmarkingButton collection={this.props.collection} />
          {!this.props.tiny && (
            <RemoveCollectionButton collection={this.props.collection} />
          )}
        </StopClickPropagation>
        <section className="collection-video-previews">
          {this.renderVideoPreviews()}
        </section>
      </section>
    );
  }
  private renderVideoPreviews() {
    const previews = [];
    if (this.props.collection.videoIds.length === this.props.numberOfPreviews) {
      previews.push(
        ...this.props.collection.videoIds
          .slice(0, this.props.numberOfPreviews)
          .map(videoId => this.renderVideoPreview(videoId)),
      );
    } else {
      previews.push(
        ...this.props.collection.videoIds
          .slice(0, this.props.numberOfPreviews - 1)
          .map(videoId => this.renderVideoPreview(videoId)),
      );
    }
    if (this.props.collection.videoIds.length > this.props.numberOfPreviews) {
      previews.push(
        this.renderVideoPreviewCount(this.props.collection.videoIds.length),
      );
    }

    while (previews.length < this.props.numberOfPreviews) {
      previews.push(this.renderVideoPreviewPadding());
    }
    return previews;
  }

  private renderVideoPreview(videoId: VideoId) {
    const video = this.props.collection.videos[videoId.id];
    return video ? (
      <StopClickPropagation key={`video-${videoId.id}`}>
        <section
          key={'collection-video-preview' + this.props.collection.id + video.id}
          className="collection-video-preview"
          data-qa="collection-video-preview"
        >
          {this.props.tiny ? (
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
      <CollectionCard.VideoPreviewSkeleton
        key={
          'collection-video-preview-skeleton' +
          this.props.collection.id +
          videoId.id
        }
      />
    );
  }

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
