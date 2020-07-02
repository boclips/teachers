import { Card, Row, Skeleton as AntSkeleton } from 'antd';
import React from 'react';
import State from 'src/types/State';
import { useSelector } from 'react-redux';
import {
  withMediaBreakPoint,
  WithMediaBreakPointProps,
} from 'src/components/common/higherOrderComponents/withMediaBreakPoint';
import MediaBreakpoints from 'src/types/MediaBreakpoints';
import { Video } from 'src/types/Video';
import { VideoCollection } from 'src/types/VideoCollection';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import { ClickableCard } from '../../common/ClickableCard/ClickableCard';
import StopClickPropagation from '../../common/StopClickPropagation';
import VideoButtons from '../buttons/videoButtons/VideoButtons';
import { VideoHeader } from '../header/VideoHeader';
import VideoPlayer from '../player/VideoPlayer';
import './VideoCard.less';

export interface Props {
  video: Video | null;
  videoIndex?: number;
  currentCollection?: VideoCollection;
  referer?: string;
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

export const VideoCard = withMediaBreakPoint(
  React.memo<Props & WithMediaBreakPointProps>((props) => {
    const isAuthenticated = useSelector((state: State) => !!state.user);
    const smallCard = props.mediaBreakpoint.width < MediaBreakpoints.md.width;

    const renderVideoButtons =
      ((props.video && props.video.links.transcript) || isAuthenticated) &&
      !smallCard;

    const emitVideoLinkClickEvent = () => {
      AnalyticsFactory.internalAnalytics().trackVideoLinkClicked(props.video);
    };
    const refererParam = props.referer ? `?referer=${props.referer}` : '';

    if (!props.video) {
      return <VideoCardSkeleton />;
    } else {
      return (
        <ClickableCard
          className="video-card"
          bordered={false}
          href={`/videos/${props.video.id}${refererParam}`}
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
                collectionKey="myCollections"
                video={props.video}
                videoIndex={props.videoIndex}
                mode="card"
              />
            </div>
          </StopClickPropagation>

          <section className="video-details">
            <p
              data-qa="video-description"
              className="description clamp-6-lines"
            >
              {props.video.description}
            </p>
            <Row className="buttons-row">
              <StopClickPropagation>
                {renderVideoButtons && (
                  <VideoButtons
                    video={props.video}
                    collection={props.currentCollection}
                    mode={'card'}
                  />
                )}
              </StopClickPropagation>
            </Row>
          </section>
        </ClickableCard>
      );
    }
  }),
);
