import { Card, Row, Skeleton as AntSkeleton } from 'antd';
import React from 'react';
import State from 'src/types/State';
import { useSelector } from 'react-redux';
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

export const VideoCardSkeleton = () => (
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
export const VideoCard = React.memo<Props>(props => {
  const isAuthenticated = useSelector((state: State) => !!state.user);
  const renderVideoButtons =
    (props.video && props.video.links.transcript) || isAuthenticated;
  const emitVideoLinkClickEvent = () => {
    // Noinspection JSIgnoredPromiseFromCall
    AnalyticsFactory.internalAnalytics().trackVideoLinkClicked(props.video);
  };

  if (!props.video) {
    return <VideoCardSkeleton />;
  } else {
    return (
      <ClickableCard
        className="video-card"
        bordered={false}
        href={`/videos/${props.video.id}`}
        onMouseDown={emitVideoLinkClickEvent}
        data-qa="video-card"
      >
        <VideoHeader video={props.video} />

        <StopClickPropagation
          wrapper="section"
          wrapperProps={{ className: 'video-preview' }}
        >
          <div aria-label={'video player'} tabIndex={0}>
            <VideoPlayer
              video={props.video}
              videoIndex={props.videoIndex}
              mode="card"
            />
          </div>
        </StopClickPropagation>

        <section className="video-details">
          <VideoCardTagList video={props.video} />
          <p data-qa="video-description" className="description clamp-3-lines">
            {props.video.description}
          </p>
          <Row className="buttons-row">
            <StopClickPropagation>
              {renderVideoButtons && (
                <VideoButtons
                  video={props.video}
                  collection={props.currentCollection}
                />
              )}
            </StopClickPropagation>
          </Row>
        </section>
      </ClickableCard>
    );
  }
});
