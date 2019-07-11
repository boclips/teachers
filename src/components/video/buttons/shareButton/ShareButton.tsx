import { Button, Dropdown, Icon, Menu } from 'antd';
import React from 'react';
import CloseSVG from '../../../../../resources/images/close.svg';
import ShareSVG from '../../../../../resources/images/share.svg';
import { Video } from '../../../../types/Video';
import CopyLinkButton from '../copyLink/CopyLinkButton';
import { GoogleClassroomShareButton } from '../gclassroom/GoogleClassroomShareButton';

import './ShareButton.less';

interface Props {
  video: Video;
}

interface MenuProps {
  video: Video;
}

const menu = (props: MenuProps) => (
  <Menu className="share-menu">
    <Menu.Item key="1" className={'share-menu__header'}>
      <span className={'share-menu__header-label'}>Share: </span>
      <Icon
        className="share-menu__header-close-button"
        data-qa="close-button"
        component={CloseSVG}
      />
    </Menu.Item>
    <Menu.Item key="2" className="share-menu__item">
      <CopyLinkButton video={props.video} />
    </Menu.Item>
    <Menu.Item key="3" className="share-menu__item">
      <GoogleClassroomShareButton video={props.video} />
    </Menu.Item>
  </Menu>
);

const ShareButton = React.memo((props: Props) => (
  <Dropdown overlay={menu(props)} trigger={['click']}>
    <Button className="video-menu-button video-menu-button--bordered">
      <section className="share-button">
        <Icon component={ShareSVG} className="share-button__icon" />
        <span>Share</span>
      </section>
    </Button>
  </Dropdown>
));

export default ShareButton;
