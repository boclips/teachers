import { Badge } from 'src/views/bit/badge';
import React from 'react';
import PaperclipSVG from 'resources/images/activity-tag.svg';
import s from './style.module.less';

export const AttachmentBadge = () => (
  <div className={s.attachment} data-qa="attachment-badge">
    <Badge label="Activity" icon={<PaperclipSVG />} />
  </div>
);
