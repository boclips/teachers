import { Icon } from 'antd';
import React from 'react';
import { Video } from '../../../types/Video';
import DateFormatter from '../../common/formatters/DateFormatter';
import DurationFormatter from '../../common/formatters/DurationFormatter';
import StopClickPropagation from '../../common/StopClickPropagation';
import VideoPreviewBadge from '../card/VideoBadge';
import Rating from '../rating/Rating';
import './VideoHeader.less';

interface Props {
  video: Video;
}

export const VideoHeader = React.memo((props: Props) => (
  <section className={'card-video-header'}>
    <h1 className="title clamp-2-lines" data-qa="video-title">
      <StopClickPropagation
        wrapper="a"
        wrapperProps={{ href: `/videos/${props.video.id}` }}
      >
        {props.video.title}
      </StopClickPropagation>
    </h1>
    <section className="badge-container">
      <VideoPreviewBadge video={props.video} />
      <p data-qa="video-duration" className={'subtitle duration'}>
        <Icon type="clock-circle" />{' '}
        <DurationFormatter duration={props.video.duration} />
      </p>
    </section>
    <section className="subtitle">
      <StopClickPropagation wrapper={'span'}>
        <Rating video={props.video} />
      </StopClickPropagation>
      Released on{' '}
      <span data-qa="video-released-on">
        <DateFormatter date={props.video.releasedOn} />
      </span>{' '}
      by <span data-qa="video-created-by">{props.video.createdBy}</span>
    </section>
  </section>
));
