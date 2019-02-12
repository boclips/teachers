import { Card, Skeleton } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '../../../types/Video';
import { VideoHeader } from '../header/VideoHeader';
import VideoPlayer from '../player/VideoPlayer';
import SubjectTag from '../tags/SubjectTag';
import VideoPreviewButtonsContainer from './VideoCardButtons';

interface Props {
  video: Video | null;
  isInCollection: boolean;
  style: 'search' | 'collection';
}

export default class VideoCard extends React.PureComponent<Props> {
  public render() {
    return (
      <Card className="video-card" bordered={false}>
        <Skeleton
          loading={this.props.video === null}
          active={true}
          title={{ width: '150px' }}
          paragraph={{ rows: 5 }}
          avatar={{ shape: 'square', size: 'large' }}
        >
          <section data-qa="video-card">{this.renderContent()}</section>
        </Skeleton>
      </Card>
    );
  }

  public renderContent() {
    if (this.props.video === null) {
      return null;
    }

    return (
      <section className="video-content">
        <VideoHeader video={this.props.video} />

        <section className={'video-preview'}>
          <div aria-label={'video player'} tabIndex={0}>
            <VideoPlayer video={this.props.video} />
          </div>
        </section>

        <section className="video-details">
          <div className="subjects-container">
            {this.props.video.subjects.map(subject => (
              <SubjectTag subject={subject} key={subject} />
            ))}
          </div>

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
