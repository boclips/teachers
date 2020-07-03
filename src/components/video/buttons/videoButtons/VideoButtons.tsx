import Icon from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
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
    const { collection, mode, video } = this.props;
    return (
      <section
        className="video-buttons__container"
        data-qa="video-buttons-container"
      >
        <section className="display-desktop">
          <DesktopButtons video={video} collection={collection} mode={mode} />
        </section>
        <section className="display-mobile-and-tablet">
          <MobileButtons video={video} collection={collection} mode={mode} />
        </section>
      </section>
    );
  }
}

const DesktopButtons = ({ video, collection, mode }: OwnProps) => (
  <Button.Group>
    <VideoCollectionButton video={video} collection={collection} />
    <VideoShareButton video={video} />
    {mode === 'card' && <DownloadTranscriptButton video={video} />}
  </Button.Group>
);

const MobileButtons = ({ video, collection, mode }: OwnProps) => {
  const menu = () => (
    <Menu className="video-buttons__container">
      <Menu.Item>
        <VideoCollectionButton video={video} collection={collection} />
      </Menu.Item>
      <Menu.Item>
        <VideoShareButton video={video} />
      </Menu.Item>
      {mode === 'card' && video.links.transcript && (
        <Menu.Item>
          <DownloadTranscriptButton video={video} />
        </Menu.Item>
      )}
      {video.links.rate && (
        <Menu.Item>
          <RateButton video={video} />
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
