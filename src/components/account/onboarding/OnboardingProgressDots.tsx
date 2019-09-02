import classnames from 'classnames';
import React from 'react';

import './OnboardingProgressDots.less';

interface Props {
  currentStep: number;
  numberOfSteps: number;
}

export class OnboardingProgressDots extends React.PureComponent<Props> {
  public render() {
    const toRender = [];
    for (let i = 1; i <= this.props.numberOfSteps; i++) {
      toRender.push(
        <span
          key={i}
          className={classnames('step', {
            'step--complete': i < this.props.currentStep,
            'step--current': i === this.props.currentStep,
          })}
        />,
      );
    }

    return <div className="navigation-tracker">{toRender}</div>;
  }
}
