import React from 'react';
import s from './style.module.less';

interface ReleasedOnProps {
  releasedOn: Date;
  createdBy: string;
}
export const ReleasedOn = (props: ReleasedOnProps) => {
  const date = new Date(props.releasedOn);
  const month = date.toLocaleDateString('en-Gb', { month: 'short' });
  const year = date.toLocaleDateString('en-Gb', { year: 'numeric' });
  const day = date.toLocaleDateString('en-Gb', { day: '2-digit' });

  return (
    <div className={s.releasedOn}>
      Released on {month} {day}, {year} by {props.createdBy}
    </div>
  );
};
