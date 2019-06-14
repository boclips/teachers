import { Button, Dropdown, Icon, Menu } from 'antd';
import { CustomIconComponentProps } from 'antd/lib/icon';
import React from 'react';
import closeSvg from '../../../../../resources/images/close.svg';
import shareSvg from '../../../../../resources/images/share.svg';
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
const share = shareSvg as React.ComponentType<CustomIconComponentProps>;
const close = closeSvg as React.ComponentType<CustomIconComponentProps>;

const menu = (props: MenuProps) => (
  <Menu className="share-menu">
    <Menu.Item key="1" className={'share-menu__header'}>
      <span className={'share-menu__header-label'}>Share: </span>
      <Icon
        className="share-menu__header-close-button"
        data-qa="close-button"
        component={close}
      />
    </Menu.Item>
    <Menu.Item key="2" className="share-button-dropdown__item">
      <CopyLinkButton video={props.video} />
    </Menu.Item>
    <Menu.Item key="3" className="share-button-dropdown__item">
      <GoogleClassroomShareButton video={props.video} />
    </Menu.Item>
  </Menu>
);

const ShareButton = React.memo((props: Props) => (
  <Dropdown overlay={menu(props)} trigger={['click']}>
    <Button className="video-menu-button video-menu-button--bordered">
      <section className="share-button">
        <Icon component={share} className="share-button__icon" />
        <span>Share</span>
      </section>
    </Button>
  </Dropdown>
));

export default ShareButton;
