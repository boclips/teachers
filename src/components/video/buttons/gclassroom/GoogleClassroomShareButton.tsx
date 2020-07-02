import { Button } from 'antd';
import React from 'react';
import GoogleClassroomIcon from '../../../../../resources/images/google-classroom-logo.png';
import './GoogleClassroomShareButton.less';
import { GoogleClassroomUrlBuilder } from './GoogleClassroomUrlBuilder';

interface Props {
  link: string;
  postTitle: string;
  postBody?: string;
  onClick: () => void;
}

export const GoogleClassroomShareButton = (props: Props) => (
  <Button
    tabIndex={1}
    onClick={() => {
      const url: string = new GoogleClassroomUrlBuilder()
        .setVideoUrl(props.link)
        .setTitle(props.postTitle)
        .setBody(props.postBody)
        .build();

      window.open(url, '_blank', 'height=570,width=520');

      props.onClick();
    }}
  >
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
