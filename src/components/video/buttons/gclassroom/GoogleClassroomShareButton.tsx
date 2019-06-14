import { Button } from 'antd';
import React from 'react';
import GoogleClassroomIcon from '../../../../../resources/images/google-classroom-logo.png';
import { Constants } from '../../../../app/AppConstants';
import { Video } from '../../../../types/Video';
import './GoogleClassroomShareButton.less';
import GoogleClassroomUrlBuilder from './GoogleClassroomUrlBuilder';

interface Props {
  video: Video;
}
export class GoogleClassroomShareButton extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  private handleClick = () => {
    const url: string = new GoogleClassroomUrlBuilder()
      .setTitle(this.props.video.title)
      .setVideoUrl(`${Constants.HOST}/videos/${this.props.video.id}`)
      .build();

    window.open(url, '_blank', 'height=570,width=520');
  };

  public render() {
    return (
      <Button
        tabIndex={1}
        className={'video-menu-button share-menu'}
        onClick={this.handleClick}
      >
        <img width="24" height="24" src={GoogleClassroomIcon} />
        <span className="google-classroom-button__label">Google Classroom</span>
      </Button>
    );
  }
}
