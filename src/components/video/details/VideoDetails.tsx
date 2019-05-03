import { Button, Skeleton } from 'antd';
import axios from 'axios';
import React from 'react';
import { Video } from '../../../types/Video';
import { VideoHeader } from '../header/VideoHeader';
import VideoPlayer from '../player/VideoPlayer';
import { SubjectTag } from '../tags/SubjectTag';

interface Props {
  video: Video | null;
}

class VideoDetailsContent extends React.PureComponent<Props> {
  public render() {
    const video = this.props.video;

    if (!video) {
      return null;
    }

    return (
      <section className="video-content">
        <VideoPlayer video={this.props.video} />
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
          <section className="buttons-row">
            {this.props.video.links.transcript && (
              <Button
                size={'large'}
                onClick={this.handleTranscriptClick}
                data-qa="download-transcript"
              >
                Download transcript
              </Button>
            )}
          </section>
        </section>
      </section>
    );
  }

  private handleTranscriptClick = () => {
    const uri = this.props.video.links.transcript;
    axios.get(uri.getOriginalLink()).then(response => {
      const disposition: string = response.headers['Content-Disposition'];
      const regex = /filename="(.*?)"/;
      const matches = regex.exec(disposition);
      const filename =
        (matches && matches.length > 1 && matches[1]) || this.props.video.title;

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };
}

class VideoDetailsSkeleton extends React.PureComponent<Props> {
  public render() {
    return (
      <section className="video-details">
        <Skeleton
          loading={!this.props.video}
          active={true}
          title={{ width: '150px' }}
          paragraph={{ rows: 5 }}
          avatar={{ shape: 'square', size: 'large' }}
        >
          {this.props.children}
        </Skeleton>
      </section>
    );
  }
}

export default class VideoDetails extends React.PureComponent<Props> {
  public render() {
    const { video } = this.props;
    return (
      <VideoDetailsSkeleton video={video}>
        <VideoDetailsContent video={video} />
      </VideoDetailsSkeleton>
    );
  }
}
