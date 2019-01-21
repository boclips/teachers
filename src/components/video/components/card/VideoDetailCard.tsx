import React from 'react';
import { Video } from '../../../../types/Video';
import VideoPlayer from '../../components/player/VideoPlayer';
import { VideoHeader } from '../VideoHeader';
import SubjectTag from './SubjectTag';

interface Props {
  video: Video;
  searchId: string | null;
}

export default class VideoDetailCard extends React.PureComponent<Props> {
  public render() {
    return (
      <section className="video-content">
        <VideoPlayer video={this.props.video} searchId={this.props.searchId} />
        <section className="video-details">
          <VideoHeader video={this.props.video} />
          <div className="subjects-container">
            {this.props.video.subjects.map(subject => (
              <SubjectTag subject={subject} key={subject} />
            ))}
          </div>
          <p data-qa="video-description" className="description">
            {this.props.video.description}
          </p>
        </section>
      </section>
    );
  }
}
