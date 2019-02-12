import { Skeleton } from 'antd';
import React from 'react';
import { Video } from '../../../types/Video';
import { VideoHeader } from '../header/VideoHeader';
import VideoPlayer from '../player/VideoPlayer';
import SubjectTag from '../tags/SubjectTag';

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
      <section className="video-content">
        <VideoPlayer video={this.props.video} />
        <section className="video-details">
          <VideoHeader video={this.props.video} />
          <div className="subjects-container">
            {this.props.video.subjects.map(subject => (
              <SubjectTag subject={subject} key={subject} />
            ))}
          </div>
          <p data-qa="video-description" className="description">
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
