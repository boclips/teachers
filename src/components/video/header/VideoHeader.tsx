import { Icon } from 'antd';
import React from 'react';
import { Video } from '../../../types/Video';
import DateFormatter from '../../common/formatters/DateFormatter';
import DurationFormatter from '../../common/formatters/DurationFormatter';
import VideoPreviewBadge from '../card/VideoBadge';
import './VideoHeader.less';

interface Props {
  video: Video;
}

export const VideoHeader = React.memo((props: Props) => (
  <section className={'video-header'}>
    <h1 className="title clamp-2-lines" data-qa="video-title">
      {props.video.title}
    </h1>
    <section className="badge-container">
      <VideoPreviewBadge video={props.video} />
      <p data-qa="video-duration" className={'subtitle duration'}>
        <Icon type="clock-circle" />{' '}
        <DurationFormatter duration={props.video.duration} />
      </p>
    </section>
    <p className={'subtitle'}>
      Released on{' '}
      <span data-qa="video-released-on">
        <DateFormatter date={props.video.releasedOn} />
      </span>{' '}
      by{' '}
      <span data-qa="video-content-partner">{props.video.contentPartner}</span>
    </p>
  </section>
));
