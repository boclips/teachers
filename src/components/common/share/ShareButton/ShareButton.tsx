import React, { useState } from 'react';
import Icon from '@ant-design/icons';
import { Button } from 'antd';
import ShareSVG from 'resources/images/share.svg';
import { ShareModal } from '../ShareModal';

export interface ShareModelProps {
  title?: string;
  children?: React.ReactNode;
  shareCode?: string;
  extra?: boolean;
  getContainer?: string | HTMLElement | GetContainerFunc | false | null;
  icon?: React.ComponentType<any>;
}
type GetContainerFunc = () => HTMLElement;

export const ShareButton = (props: ShareModelProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)} data-qa="share-button">
        <Icon component={props.icon ? props.icon : ShareSVG} />
        <span>Share</span>
      </Button>
      <ShareModal
        title={props.title}
        shareCode={props.shareCode}
        extra={props.extra}
        visible={visible}
        onCancel={() => setVisible(false)}
        getContainer={props.getContainer}
      >
        {props.children}
      </ShareModal>
    </>
  );
};
