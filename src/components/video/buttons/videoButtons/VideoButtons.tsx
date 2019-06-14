import { Button, Dropdown, Icon, Menu } from 'antd';
import { CustomIconComponentProps } from 'antd/lib/icon';
import React from 'react';
import moreSvg from '../../../../../resources/images/more.svg';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';
import CopyLinkButton from '../copyLink/CopyLinkButton';
import DownloadTranscriptButton from '../downloadTranscriptButton/DownloadTranscriptButton';
import { GoogleClassroomShareButton } from '../gclassroom/GoogleClassroomShareButton';
import ShareButton from '../shareButton/ShareButton';
import VideoCollectionButton from '../videoCollection/VideoCollectionButton';
import './VideoButtons.less';

interface OwnProps {
  video: Video;
  collection?: VideoCollection;
}
const svg = moreSvg as React.ComponentType<CustomIconComponentProps>;

export default class VideoButtons extends React.PureComponent<OwnProps> {
  public render() {
    return (
      <section className="video-buttons__container">
        <section className="display-desktop">
          <DesktopButtons {...this.props} />
        </section>
        <section className="display-mobile-and-tablet">
          <MobileButtons {...this.props} />
        </section>
      </section>
    );
  }
}

const DesktopButtons = (props: OwnProps) => {
  return (
    <Button.Group>
      <VideoCollectionButton
        video={props.video}
        collection={props.collection}
      />
      <ShareButton video={props.video} />
      <DownloadTranscriptButton
        className="video-menu-button video-menu-button--bordered"
        video={props.video}
      />
    </Button.Group>
  );
};

const MobileButtons = (props: OwnProps) => {
  const items = [];
  items.push(
    <Menu.Item key="1">
      <CopyLinkButton video={props.video} />
    </Menu.Item>,
  );
  items.push(
    <Menu.Item key="2">
      <GoogleClassroomShareButton video={props.video} />
    </Menu.Item>,
  );
  if (props.video.links.transcript) {
    items.push(
      <Menu.Item key="3">
        <DownloadTranscriptButton
          className="video-menu-button video-menu-button--un-padded"
          video={props.video}
        />
      </Menu.Item>,
    );
  }
  const menu = () => (
    <Menu className="video-buttons__dropdown">{...items}</Menu>
  );

  return (
    <Button.Group>
      <VideoCollectionButton
        video={props.video}
        collection={props.collection}
      />
      <Dropdown overlay={menu()} trigger={['click']}>
        <Button className={'video-menu-button video-menu-button--bordered'}>
          <Icon component={svg} />
        </Button>
      </Dropdown>
    </Button.Group>
  );
};
