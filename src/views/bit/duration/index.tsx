import React from 'react';
import { Icon } from 'antd';
import s from './style.module.less';

interface DurationProps {
  duration: string;
}

export const Duration = (props: DurationProps) => {
  const durationFormatter = (d: string) =>
    d.replace('PT', '').replace('H', 'h ').replace('M', 'm ').replace('S', 's');

  return (
    <div className={s.duration}>
      <Icon type="clock-circle" />
      <span>{durationFormatter(props.duration)}</span>
    </div>
  );
};
