import { Card, Row, Skeleton as AntSkeleton } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
import StopClickPropagation from '../../common/StopClickPropagation';
import VideoButtons from '../buttons/videoButtons/VideoButtons';
import { VideoHeader } from '../header/VideoHeader';
import VideoPlayer from '../player/VideoPlayer';
import { SubjectTag } from '../tags/SubjectTag';
import './VideoCard.less';

export interface Props {
  video: Video | null;
  videoIndex?: number;
  currentCollection?: VideoCollection;
}

export class VideoCardForRouter extends React.PureComponent<Props> {
  public render() {
    if (!this.props.video) {
      return <VideoCardForRouter.Skeleton />;
    }

    return (
      <Link className="no-underline" to={`/videos/${this.props.video.id}`}>
        <Card className="video-card" bordered={false}>
          <section data-qa="video-card">{this.renderContent()}</section>
        </Card>
      </Link>
    );
  }

  public renderContent() {
    return (
      <section className="video-content">
        <VideoHeader video={this.props.video} />

        <StopClickPropagation
          wrapper="section"
          wrapperProps={{ className: 'video-preview' }}
        >
          <div aria-label={'video player'} tabIndex={0}>
            <VideoPlayer
              video={this.props.video}
              videoIndex={this.props.videoIndex}
              mode="card"
            />
          </div>
        </StopClickPropagation>

        <section className="video-details">
          {this.props.video.subjects.length !== 0 && (
            <div className="subjects-container">
              {this.props.video.subjects.map(subject => (
                <SubjectTag subject={subject} key={subject} />
              ))}
            </div>
          )}

          <p data-qa="video-description" className="description clamp-3-lines">
            {this.props.video.description}
          </p>

          <Row className="buttons-row">
            <StopClickPropagation>
              <VideoButtons
                video={this.props.video}
                collection={this.props.currentCollection}
              />
            </StopClickPropagation>
          </Row>
        </section>
      </section>
    );
  }

  public static Skeleton = () => (
    <Card className="video-card skeleton" bordered={false}>
      <AntSkeleton
        loading={true}
        active={true}
        title={{ width: '150px' }}
        paragraph={{ rows: 5 }}
        avatar={{ shape: 'square', size: 'large' }}
      />
    </Card>
  );
}

const VideoCard = VideoCardForRouter;

export default VideoCard;
