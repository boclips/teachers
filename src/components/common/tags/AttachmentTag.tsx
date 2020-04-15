import React from 'react';
import './AttachmentTag.less';
import PaperclipSVG from '../../../../resources/images/activity-tag.svg';

export interface Props {
  label: string;
}

export const AttachmentTag = (props: Props) => (
  <span className={'attachment-tag'}>
    <PaperclipSVG />
    <span className={'attachment-tag__label'}>{props.label}</span>
  </span>
);
