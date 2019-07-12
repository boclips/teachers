import { Button, Dropdown, Icon, Menu } from 'antd';
import React from 'react';
import MoreSVG from '../../../../../resources/images/more.svg';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';
import DownloadTranscriptButton from '../downloadTranscriptButton/DownloadTranscriptButton';
import RateButton from '../rate/RateButton';
import ShareButton from '../shareButton/ShareButton';
import VideoCollectionButton from '../videoCollection/VideoCollectionButton';
import './VideoButtons.less';

interface OwnProps {
  video: Video;
  collection?: VideoCollection;
}

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
      <ShareButton video={props.video} needsBorder={true} />
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
      <ShareButton video={props.video} needsBorder={false} />
    </Menu.Item>,
  );
  if (props.video.links.transcript) {
    items.push(
      <Menu.Item key="2">
        <DownloadTranscriptButton
          className="video-menu-button video-menu-button--un-padded"
          video={props.video}
        />
      </Menu.Item>,
    );
  }
  if (props.video.links.rate) {
    items.push(
      <Menu.Item key="3">
        <RateButton video={props.video} />
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
          <Icon component={MoreSVG} />
        </Button>
      </Dropdown>
    </Button.Group>
  );
};
