import { Button } from 'antd';
import React from 'react';
import GoogleClassroomIcon from '../../../../../resources/images/google-classroom-logo.png';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import getVideoDetailsLink from '../../../../services/links/getVideoDetailsLink';
import { Segment, Video } from '../../../../types/Video';
import './GoogleClassroomShareButton.less';
import GoogleClassroomUrlBuilder from './GoogleClassroomUrlBuilder';

interface Props {
  video: Video;
  segment: Segment | null;
  userId: string | null;
}

export class GoogleClassroomShareButton extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  private handleClick = () => {
    const link = getVideoDetailsLink({
      absolute: true,
      videoId: this.props.video.id,
      userId: this.props.userId,
      segment: this.props.segment,
    });

    AnalyticsFactory.mixpanel().trackVideoSharedInGoogle(
      this.props.video,
      this.props.segment,
    );
    AnalyticsFactory.boclips()
      .trackVideoSharedInGoogle(this.props.video)
      .catch(console.error);
    const url: string = new GoogleClassroomUrlBuilder()
      .setTitle(this.props.video.title)
      .setVideoUrl(link)
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
