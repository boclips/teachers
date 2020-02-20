import { Card, Row, Skeleton as AntSkeleton } from 'antd';
import React from 'react';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import { Video } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
import { ClickableCard } from '../../common/ClickableCard/ClickableCard';
import StopClickPropagation from '../../common/StopClickPropagation';
import VideoButtons from '../buttons/videoButtons/VideoButtons';
import { VideoHeader } from '../header/VideoHeader';
import VideoPlayer from '../player/VideoPlayer';
import './VideoCard.less';
import VideoCardTagList from './VideoCardTagList';

export interface Props {
  video: Video | null;
  videoIndex?: number;
  currentCollection?: VideoCollection;
}

export class VideoCard extends React.PureComponent<Props> {
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

  public render() {
    if (!this.props.video) {
      return <VideoCard.Skeleton />;
    }

    return (
      <ClickableCard
        className="video-card"
        bordered={false}
        href={`/videos/${this.props.video.id}`}
        onMouseDown={this.emitVideoLinkClickEvent}
        data-qa="video-card"
      >
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
          <VideoCardTagList video={this.props.video} />
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
      </ClickableCard>
    );
  }

  private emitVideoLinkClickEvent = () => {
    // Noinspection JSIgnoredPromiseFromCall
    AnalyticsFactory.internalAnalytics().trackVideoLinkClicked(
      this.props.video,
    );
  };
}
