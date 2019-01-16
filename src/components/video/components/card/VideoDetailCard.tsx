import { Icon } from 'antd';
import React from 'react';
import { Video } from '../../../../types/Video';
import DateFormatter from '../../components/dateFormatter/DateFormatter';
import DurationFormatter from '../../components/durationForammter/DurationFormatter';
import VideoPlayer from '../../components/player/VideoPlayer';
import SubjectTag from './SubjectTag';

interface Props {
  video: Video;
  searchId: string | null;
}

export default class VideoDetailCard extends React.PureComponent<Props> {
  public render() {
    return (
      <section className="video-content">
        <section className={'video-thumbnail'}>
          <VideoPlayer
            video={this.props.video}
            searchId={this.props.searchId}
          />
        </section>
        <section className="video-content--video-details">
          <section className={'video-header'}>
            <h1 className="title" data-qa="video-details-title">
              {this.props.video.title}
            </h1>
          </section>
          <p data-qa="video-duration" className={'subtitle duration'}>
            <Icon type="clock-circle" />{' '}
            <DurationFormatter duration={this.props.video.duration} />
          </p>
          <p className={'subtitle'}>
            Released on{' '}
            <span data-qa="video-released-on">
              <DateFormatter date={this.props.video.releasedOn} />
            </span>{' '}
            by{' '}
            <span data-qa="video-content-partner">
              {this.props.video.contentPartner}
            </span>
          </p>
          <p>
            {this.props.video.subjects.map(subject => (
              <SubjectTag subject={subject} key={subject} />
            ))}
          </p>
          <p data-qa="video-description" className="description">
            {this.props.video.description}
          </p>
        </section>
      </section>
    );
  }
}
