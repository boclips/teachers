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
  <Menu className="video-buttons__container share-button-dropdown">
    <Menu.Item key="1" className={'share-option'}>
      <span className={'share-option__label'}>Share: </span>
      <Icon
        className="share-option__close-button"
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
  <div className="display-tablet-and-desktop">
    <Dropdown overlay={menu(props)} trigger={['click']}>
      <Button>
        <section className="share-button">
          <Icon component={share} className="share-button__icon" />
          <span>Share</span>
        </section>
      </Button>
    </Dropdown>
  </div>
));

export default ShareButton;
