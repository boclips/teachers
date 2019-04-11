import { Card, Row, Skeleton as AntSkeleton } from 'antd';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Video } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
import { VideoHeader } from '../header/VideoHeader';
import VideoPlayer from '../player/VideoPlayer';
import SubjectTag from '../tags/SubjectTag';
import CopyLinkButton from './CopyLinkButton';
import './VideoCard.less';
import ManageVideoCollectionsButton from './videoCollectionButton/ManageVideoCollectionButton';
import RemoveFromVideoCollectionButton from './videoCollectionButton/RemoveFromVideoCollectionButton';

export interface Props extends RouteComponentProps {
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
      <Card className="video-card" bordered={false}>
        <section data-qa="video-card">{this.renderContent()}</section>
      </Card>
    );
  }

  public renderContent() {
    return (
      <section className="video-content">
        <VideoHeader video={this.props.video} onClick={this.navigateToVideo} />

        <section className={'video-preview'}>
          <div aria-label={'video player'} tabIndex={0}>
            <VideoPlayer
              video={this.props.video}
              videoIndex={this.props.videoIndex}
            />
          </div>
        </section>

        <section className="video-details">
          {this.props.video.subjects.length !== 0 && (
            <div className="subjects-container">
              {this.props.video.subjects.map(subject => (
                <SubjectTag subject={subject} key={subject} />
              ))}
            </div>
          )}

          <p
            data-qa="video-description"
            className="description clamp-3-lines"
            onClick={this.navigateToVideo}
          >
            {this.props.video.description}
          </p>

          <Row className="buttons-row">
            <CopyLinkButton video={this.props.video} />
            {this.renderVideoManagementButton()}
          </Row>
        </section>
      </section>
    );
  }

  private renderVideoManagementButton() {
    return this.props.currentCollection &&
      this.props.currentCollection.links.removeVideo ? (
      <RemoveFromVideoCollectionButton
        video={this.props.video}
        collection={this.props.currentCollection}
      />
    ) : (
      <ManageVideoCollectionsButton video={this.props.video} />
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

  private navigateToVideo = () => {
    this.props.history.push(`/videos/${this.props.video.id}`);
  };
}

const VideoCard = withRouter(VideoCardForRouter);

export default VideoCard;
