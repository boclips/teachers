import React from 'react';
import { AgeRange } from 'src/types/AgeRange';
import { Subject } from 'src/types/Subject';
import s from './style.module.less';

export interface VideoBadeProps {
  ageRange?: AgeRange;
  badges?: string[];
  subjects?: Subject[];
  bestFor?: string;
  hideAgeRangeLabel?: boolean;
  children?: React.ReactNode;
}

export const BadgeList = (props: VideoBadeProps) => (
  <div className={s.badgeList} data-qa="video-badge-list">
    {props.children}
  </div>
);
