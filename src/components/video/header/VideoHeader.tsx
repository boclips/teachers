import { Icon } from 'antd';
import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import badgeYoutube from 'resources/images/badge-youtube.png';
import { Video } from 'src/types/Video';
import { VideoCardTagList } from 'src/components/video/card/VideoCardTagList';
import DateFormatter from '../../common/formatters/DateFormatter';
import DurationFormatter from '../../common/formatters/DurationFormatter';
import StopClickPropagation from '../../common/StopClickPropagation';
import Rating from '../rating/Rating';
import './VideoHeader.less';

interface Props {
  video: Video;
}

export const VideoHeader = withRouter(
  React.memo((props: Props & RouteComponentProps) => (
    <section className={'card-video-header'}>
      <h1 className="title clamp-2-lines" data-qa="video-title">
        <Link to={`/videos/${props.video.id}`} onClick={onClick}>
          {props.video.title}
        </Link>
      </h1>
      <section className="badge-container">
        {props.video.badges && props.video.badges.indexOf('youtube') !== -1 && (
          <img
            src={badgeYoutube}
            data-qa={'youtube-badge'}
            className={`video-badge youtube`}
            alt={'YouTube'}
          />
        )}
        <p data-qa="video-duration" className={'subtitle duration'}>
          <Icon type="clock-circle" />{' '}
          <DurationFormatter duration={props.video.duration} />
        </p>
      </section>
      <VideoCardTagList video={props.video} />
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
  )),
);

const onClick = event => event.preventDefault();
