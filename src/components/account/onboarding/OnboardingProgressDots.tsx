import classnames from 'classnames';
import React from 'react';

import './OnboardingProgressDots.less';

interface Props {
  page: number;
  numberOfPages: number;
}

export class OnboardingProgressDots extends React.PureComponent<Props> {
  public render() {
    const toRender = [];
    for (let i = 0; i < this.props.numberOfPages; i++) {
      toRender.push(
        <span
          key={i}
          className={classnames('step', {
            'step--complete': i < this.props.page,
            'step--current': i === this.props.page,
          })}
        />,
      );
    }

    return <div className="navigation-tracker">{toRender}</div>;
  }
}
