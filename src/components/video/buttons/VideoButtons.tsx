import { Button, Dropdown, Icon, Menu } from 'antd';
import { CustomIconComponentProps } from 'antd/lib/icon';
import React from 'react';
import moreSvg from '../../../../resources/images/more.svg';
import { Video } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
import CopyLinkButton from './copyLink/CopyLinkButton';
import DownloadTranscriptButton from './DownloadTranscriptButton';
import './VideoButtons.less';
import VideoCollectionButton from './videoCollection/VideoCollectionButton';

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
      <CopyLinkButton video={props.video} />
      <DownloadTranscriptButton video={props.video} />
    </Button.Group>
  );
};

const MobileButtons = (props: OwnProps) => {
  const menu = () => (
    <Menu className="video-buttons__dropdown">
      <Menu.Item key="1">
        <CopyLinkButton video={props.video} />
      </Menu.Item>
      <Menu.Item key="2">
        <DownloadTranscriptButton video={props.video} />
      </Menu.Item>
    </Menu>
  );

  return (
    <Button.Group>
      <VideoCollectionButton
        video={props.video}
        collection={props.collection}
      />
      <Dropdown overlay={menu()} trigger={['click']}>
        <Button htmlType="button">
          <Icon component={svg} />
        </Button>
      </Dropdown>
    </Button.Group>
  );
};
