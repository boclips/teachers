import Icon from '@ant-design/icons';
import React from 'react';

import './SectionHeader.less';

interface Props {
  title: string;
  description?: string;
  image?: React.ComponentType<any>;
}

export const SectionHeader = React.memo((props: Props) => (
  <React.Fragment>
    <h1 className="big-title alt section-header__title">
      <Icon component={props.image} className="section-header__icon" />{' '}
      {props.title}
    </h1>

    <p className="section-header__description display-tablet-and-desktop">
      {props.description}
    </p>
  </React.Fragment>
));
