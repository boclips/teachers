import React from 'react';
import s from './style.module.less';

export const Badge = (props) => (
  <div className={s.badge}>
    {props.icon && props.icon}
    {props.label && <div className={s.label}>{props.label}</div>}
    {props.value && <div className={s.value}>{props.value}</div>}
  </div>
);
