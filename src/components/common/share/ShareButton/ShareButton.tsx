import React, { useState } from 'react';
import { Button, Icon } from 'antd';
import ShareSVG from 'resources/images/share.svg';
import './ShareButton';
import { ShareModal } from '../ShareModal';

export interface ShareModelProps {
  title?: string;
  children?: React.ReactNode;
  shareCode?: string;
  extra?: boolean;
  getContainer?: string | HTMLElement | getContainerFunc | false | null;
  icon?: React.ComponentType<any>;
}
type getContainerFunc = () => HTMLElement;

export const ShareButton = (props: ShareModelProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setVisible(true)} data-qa={'share-button'}>
        <Icon component={props.icon ? props.icon : ShareSVG} />
        <span>Share</span>
      </Button>
      <ShareModal
        title={props.title}
        children={props.children}
        shareCode={props.shareCode}
        extra={props.extra}
        visible={visible}
        onCancel={() => setVisible(false)}
        getContainer={props.getContainer}
      />
    </React.Fragment>
  );
};
