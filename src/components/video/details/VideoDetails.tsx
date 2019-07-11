import { Icon, Skeleton } from 'antd';
import React from 'react';
import { Video } from '../../../types/Video';
import DateFormatter from '../../common/formatters/DateFormatter';
import DurationFormatter from '../../common/formatters/DurationFormatter';
import StopClickPropagation from '../../common/StopClickPropagation';
import VideoButtons from '../buttons/videoButtons/VideoButtons';
import VideoPreviewBadge from '../card/VideoBadge';
import VideoPlayer from '../player/VideoPlayer';
import Rating from '../rating/Rating';
import { SubjectTag } from '../tags/SubjectTag';
import './VideoDetails.less';

interface Props {
  video: Video | null;
}

class VideoDetailsContent extends React.PureComponent<Props> {
  public render() {
    const video = this.props.video;

    if (!video) {
      return null;
    }

    return (
      <section
        className="video-details-container video-content"
        itemScope={true}
        itemType="http://schema.org/Article"
      >
        <section className={'video-header'}>
          <h1
            className="title clamp-2-lines big-title"
            data-qa="video-title"
            itemProp="name"
          >
            {this.props.video.title}
          </h1>
          <section className="subtitle">
            <Rating video={this.props.video} />
            Released on{' '}
            <span data-qa="video-released-on">
              <DateFormatter date={this.props.video.releasedOn} />
            </span>{' '}
            by <span data-qa="video-source">{this.props.video.source}</span>
          </section>
        </section>
        <section className="buttons-row">
          <VideoButtons video={this.props.video} />
        </section>
        <VideoPlayer video={this.props.video} />
        <img
          src={this.props.video.thumbnailUrl}
          style={{ display: 'none' }}
          itemProp="image"
        />
        <section className="video-details">
          <section className="badges-row">
            <div className="subjects-container">
              {this.props.video.subjects.map(subject => (
                <StopClickPropagation>
                  <SubjectTag subjectName={subject} key={subject} />
                </StopClickPropagation>
              ))}
            </div>
            <section className="badge-container">
              <p data-qa="video-duration" className={'subtitle duration'}>
                <Icon type="clock-circle" />{' '}
                <DurationFormatter duration={this.props.video.duration} />
              </p>
              <VideoPreviewBadge video={this.props.video} />
            </section>
          </section>
          <p
            data-qa="video-description"
            className="description"
            itemProp="description"
          >
            {this.props.video.description}
          </p>
        </section>
      </section>
    );
  }
}

class VideoDetailsSkeleton extends React.PureComponent<Props> {
  public render() {
    return (
      <section className="video-details">
        <Skeleton
          loading={!this.props.video}
          active={true}
          title={{ width: '150px' }}
          paragraph={{ rows: 5 }}
          avatar={{ shape: 'square', size: 'large' }}
        >
          {this.props.children}
        </Skeleton>
      </section>
    );
  }
}

export default class VideoDetails extends React.PureComponent<Props> {
  public render() {
    const { video } = this.props;
    return (
      <VideoDetailsSkeleton video={video}>
        <VideoDetailsContent video={video} />
      </VideoDetailsSkeleton>
    );
  }
}
