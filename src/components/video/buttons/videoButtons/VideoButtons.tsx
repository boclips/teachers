import { Button, Dropdown, Icon, Menu } from 'antd';
import React from 'react';
import { DownloadTranscriptButton } from 'src/components/video/buttons/downloadTranscriptButton/DownloadTranscriptButton';
import MoreSVG from '../../../../../resources/images/more.svg';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';
import RateButton from '../rate/RateButton';
import { VideoShareButton } from '../../sharing/VideoShareButton/VideoShareButton';
import VideoCollectionButton from '../videoCollection/VideoCollectionButton';
import './VideoButtons.less';

interface OwnProps {
  video: Video;
  collection?: VideoCollection;
  mode?: 'default' | 'card';
}

export default class VideoButtons extends React.PureComponent<OwnProps> {
  public render() {
    return (
      <section
        className="video-buttons__container"
        data-qa="video-buttons-container"
      >
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

const DesktopButtons = (props: OwnProps) => (
  <Button.Group>
    <VideoCollectionButton video={props.video} collection={props.collection} />
    <VideoShareButton video={props.video} />
    {props.mode === 'card' && <DownloadTranscriptButton video={props.video} />}
  </Button.Group>
);

const MobileButtons = (props: OwnProps) => {
  console.log('mobile buttonns');
  const menu = () => (
    <Menu className="video-buttons__container">
      <Menu.Item>
        <VideoCollectionButton
          video={props.video}
          collection={props.collection}
        />
      </Menu.Item>
      <Menu.Item>
        <VideoShareButton video={props.video} />
      </Menu.Item>
      {props.mode === 'card' && props.video.links.transcript && (
        <Menu.Item>
          <DownloadTranscriptButton video={props.video} />
        </Menu.Item>
      )}
      {props.video.links.rate && (
        <Menu.Item>
          <RateButton video={props.video} />
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <Button.Group>
      <Dropdown overlay={menu()} trigger={['click']}>
        <Button>
          <Icon component={MoreSVG} />
        </Button>
      </Dropdown>
    </Button.Group>
  );
};
