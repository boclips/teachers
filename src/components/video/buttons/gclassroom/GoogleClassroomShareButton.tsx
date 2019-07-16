import { Button } from 'antd';
import queryString from 'query-string';
import React from 'react';
import GoogleClassroomIcon from '../../../../../resources/images/google-classroom-logo.png';
import { Constants } from '../../../../app/AppConstants';
import { Segment, Video } from '../../../../types/Video';
import './GoogleClassroomShareButton.less';
import GoogleClassroomUrlBuilder from './GoogleClassroomUrlBuilder';

interface Props {
  video: Video;
  segment?: Segment;
}
export class GoogleClassroomShareButton extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  private handleClick = () => {
    const baseUrlToVideo = `${Constants.HOST}/videos/${this.props.video.id}`;

    const params = queryString.stringify({
      segmentStart: this.props.segment && this.props.segment.start,
      segmentEnd: this.props.segment && this.props.segment.end,
    });

    let urlToVideo = null;
    if (params) {
      urlToVideo = `${baseUrlToVideo}?${params}`;
    } else {
      urlToVideo = baseUrlToVideo;
    }

    const url: string = new GoogleClassroomUrlBuilder()
      .setTitle(this.props.video.title)
      .setVideoUrl(urlToVideo)
      .build();

    window.open(url, '_blank', 'height=570,width=520');
  };

  public render() {
    return (
      <Button tabIndex={1} onClick={this.handleClick}>
        <img width="24" height="24" src={GoogleClassroomIcon} />
        <span className="google-classroom-button__label">
          Send to Google Classroom
        </span>
      </Button>
    );
  }
}
