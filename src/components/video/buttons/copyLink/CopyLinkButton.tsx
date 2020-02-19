import { Button, Icon } from 'antd';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import NotificationFactory from 'src/components/common/NotificationFactory';
import CopyLinkSVG from '../../../../../resources/images/copy-link.svg';

interface Props {
  link: string;
  onClick: () => void;
}

export const CopyLinkButton = (props: Props) => (
  <CopyToClipboard
    text={props.link}
    onCopy={() => {
      NotificationFactory.success({
        message: 'Copied!',
        description: 'The link has been copied to your clipboard.',
      });
      props.onClick();
    }}
    options={{ debug: true }}
  >
    <Button data-qa="copy-link" data-link={props.link} tabIndex={0}>
      <Icon component={CopyLinkSVG} /> Copy link
    </Button>
  </CopyToClipboard>
);
