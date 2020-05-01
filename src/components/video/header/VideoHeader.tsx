import { Icon } from 'antd';
import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Video } from 'src/types/Video';
import { VideoCardTagList } from 'src/components/video/card/VideoCardTagList';
import { ButtonMenu } from 'src/components/common/buttons/ButtonMenu';
import { VideoShareButton } from 'src/components/video/sharing/VideoShareButton/VideoShareButton';
import { DownloadTranscriptButton } from 'src/components/video/buttons/downloadTranscriptButton/DownloadTranscriptButton';
import RateButton from 'src/components/video/buttons/rate/RateButton';
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
    <section className={'video-card-header'}>
      <h1 className="title clamp-2-lines" data-qa="video-title">
        <Link to={`/videos/${props.video.id}`} onClick={onClick}>
          {props.video.title}
        </Link>
      </h1>
      <StopClickPropagation wrapper={'section'}>
        <ButtonMenu
          buttons={[
            <VideoShareButton video={props.video} />,
            <DownloadTranscriptButton video={props.video} />,
            <RateButton video={props.video} />,
          ]}
          className="video-buttons display-mobile-and-tablet"
        />
      </StopClickPropagation>
      <section className="badge-container">
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

const onClick = (event) => event.preventDefault();
