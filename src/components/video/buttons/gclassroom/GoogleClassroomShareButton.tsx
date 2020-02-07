import { Button } from 'antd';
import React from 'react';
import GoogleClassroomIcon from '../../../../../resources/images/google-classroom-logo.png';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { getShareableVideoLink } from '../../../../services/links/getShareableVideoLink';
import { Segment, Video } from '../../../../types/Video';
import './GoogleClassroomShareButton.less';
import GoogleClassroomUrlBuilder from './GoogleClassroomUrlBuilder';

interface Props {
  video: Video;
  segment: Segment | null;
  userId: string;
  shareCode: string;
}

export class GoogleClassroomShareButton extends React.Component<Props> {
  public constructor(props: Props) {
    super(props);
  }

  private handleClick = () => {
    const link = getShareableVideoLink(
      this.props.video.id,
      this.props.userId,
      this.props.segment,
    );

    AnalyticsFactory.externalAnalytics().trackVideoSharedInGoogle(
      this.props.video,
      this.props.segment,
    );
    AnalyticsFactory.internalAnalytics()
      .trackVideoSharedInGoogle(this.props.video)
      .catch(console.error);
    const url: string = new GoogleClassroomUrlBuilder()
      .setTitle(this.props.video.title)
      .setVideoUrl(link)
      .setBody(`Use code ${this.props.shareCode} to view this.`)
      .build();

    window.open(url, '_blank', 'height=570,width=520');
  };

  public render() {
    return (
      <Button tabIndex={1} onClick={this.handleClick}>
        <img
          width="24"
          height="24"
          src={GoogleClassroomIcon}
          alt="Google Classroom logo"
        />
        <span className="google-classroom-button__label">
          Send to Google Classroom
        </span>
      </Button>
    );
  }
}
